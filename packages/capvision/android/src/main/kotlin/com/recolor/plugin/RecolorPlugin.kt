package com.recolor.plugin

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Color
import android.net.Uri
import android.util.Log
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.segmentation.subject.SubjectSegmentation
import com.google.mlkit.vision.segmentation.subject.SubjectSegmenterOptions
import java.nio.ByteBuffer
import android.util.Base64

@CapacitorPlugin(name = "Recolor")
class RecolorPlugin : Plugin() {

    @PluginMethod

    fun createSession(call: PluginCall) {

    }

    fun detectColor(call: PluginCall) {
        val base64 = call.getString("imageBase64") ?: return call.reject("No imageBase64 provided")

        val bytes = android.util.Base64.decode(base64, android.util.Base64.DEFAULT)
        val bitmap = BitmapFactory.decodeByteArray(bytes, 0, bytes.size)
            ?: return call.reject("Could not decode image")

        val segmenterOptions = SubjectSegmenterOptions.Builder()
            .enableForegroundConfidenceMask()
            .build()

        val segmenter = SubjectSegmentation.getClient(segmenterOptions)
        val image = InputImage.fromBitmap(bitmap, 0)

        segmenter.process(image)
            .addOnSuccessListener { result ->
                val mask = result.foregroundConfidenceMask
                if (mask == null) {
                    call.reject("No subject detected")
                    return@addOnSuccessListener
                }

                // move heavy work off main thread
                Thread {
                    mask.rewind()
                    val dominantColor = detectDominantColor(bitmap, mask)
                    val ret = JSObject().apply { put("detectedColor", dominantColor) }
                    call.resolve(ret)
                }.start()
            }
            .addOnFailureListener { e ->
                call.reject("Segmentation failed: ${e.localizedMessage}")
            }
    }
}
fun detectDominantColor(bitmap: Bitmap, confidenceBuffer: java.nio.FloatBuffer): String {
    val width = bitmap.width
    val height = bitmap.height

    confidenceBuffer.rewind()

    var rSum = 0L
    var gSum = 0L
    var bSum = 0L
    var count = 0

    for (y in 0 until height) {
        for (x in 0 until width) {
            if (confidenceBuffer.hasRemaining()) {
                val confidence = confidenceBuffer.get()
                if (confidence > 0.5f) {
                    val pixel = bitmap.getPixel(x, y)
                    rSum += Color.red(pixel)
                    gSum += Color.green(pixel)
                    bSum += Color.blue(pixel)
                    count++
                }
            }
        }
    }

    if (count == 0) return "#000000"

    val r = (rSum / count).toInt()
    val g = (gSum / count).toInt()
    val b = (bSum / count).toInt()

    return String.format("#%02X%02X%02X", r, g, b)
}