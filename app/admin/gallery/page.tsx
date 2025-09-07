"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { AuthGuard } from "@/components/admin/auth-guard"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Upload, ImageIcon, Video, Trash2, Eye, Plus, X } from "lucide-react"
import { galleryStorage, type GalleryItem } from "@/lib/gallery-storage"

function GalleryContent() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    galleryStorage.initializeDefaults()
    setGalleryItems(galleryStorage.getItems())

    const unsubscribe = galleryStorage.subscribe((updatedItems) => {
      setGalleryItems(updatedItems)
    })

    return unsubscribe
  }, [])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith("image/")
      const isVideo = file.type.startsWith("video/")
      const isValidSize = file.size <= 50 * 1024 * 1024 // 50MB limit
      return (isImage || isVideo) && isValidSize
    })

    setSelectedFiles(validFiles)

    // Create preview URLs
    const urls = validFiles.map((file) => URL.createObjectURL(file))
    setPreviewUrls(urls)
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    const uploadPromises = selectedFiles.map(async (file, index) => {
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 20) {
        setUploadProgress((prev) => Math.max(prev, (index * 100 + progress) / selectedFiles.length))
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      // Convert file to base64 for persistent storage
      return new Promise<GalleryItem>((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const base64Url = e.target?.result as string
          resolve({
            id: Date.now().toString() + index + Math.random().toString(36).substr(2, 9),
            name: file.name.split(".")[0],
            type: file.type.startsWith("image/") ? "image" : "video",
            url: base64Url, // Store as base64 for persistence
            size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
            uploadDate: new Date().toISOString().split("T")[0],
          })
        }
        reader.readAsDataURL(file)
      })
    })

    const newItems = await Promise.all(uploadPromises)

    galleryStorage.addItems(newItems)

    // Reset form
    setSelectedFiles([])
    setPreviewUrls([])
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }

    setIsUploading(false)
  }

  const handleDelete = (id: string) => {
    const updatedItems = galleryStorage.removeItem(id)
    setGalleryItems(updatedItems)
  }

  const clearSelection = () => {
    setSelectedFiles([])
    setPreviewUrls([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <AdminLayout currentPage="gallery">
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white">
        <div className="max-w-7xl mx-auto p-8 space-y-8">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Gallery Management
            </h1>
            <p className="text-rose-600/80 max-w-2xl mx-auto">
              Upload and manage beautiful photos and videos for your website gallery
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full"></div>
          </div>

          <Card className="bg-white/95 backdrop-blur-sm border border-rose-100 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-rose-800 font-playfair flex items-center">
                <Upload className="w-5 h-5 text-rose-600 mr-3" />
                Upload New Media
              </CardTitle>
              <CardDescription className="text-rose-600/70">
                Upload images (JPG, PNG, WebP) and videos (MP4, MOV) up to 50MB each
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="file-upload" className="text-rose-700 font-medium">
                  Select Files
                </Label>
                <Input
                  ref={fileInputRef}
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="border-2 border-dashed border-rose-200 focus:border-rose-400 h-12 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
                />
                <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                  Select multiple files. Supported: JPG, PNG, WebP, MP4, MOV
                </p>
              </div>

              {selectedFiles.length > 0 && (
                <div className="space-y-4 bg-rose-50/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">Selected Files ({selectedFiles.length})</h3>
                    <Button variant="ghost" size="sm" onClick={clearSelection} className="text-gray-500">
                      <X className="w-4 h-4 mr-1" />
                      Clear
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="group">
                        <div className="aspect-square bg-white rounded-lg overflow-hidden border border-rose-200 shadow-sm">
                          {file.type.startsWith("image/") ? (
                            <img
                              src={previewUrls[index] || "/placeholder.svg"}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-50">
                              <Video className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {isUploading && (
                <div className="space-y-2 bg-rose-50/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-rose-700 font-medium">Uploading files...</span>
                    <span className="text-rose-600">{Math.round(uploadProgress)}%</span>
                  </div>
                  <div className="w-full bg-rose-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex justify-center">
                <Button
                  onClick={handleUpload}
                  disabled={selectedFiles.length === 0 || isUploading}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {isUploading ? (
                    <>
                      <Upload className="w-4 h-4 mr-2 animate-spin" />
                      Uploading... {Math.round(uploadProgress)}%
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Upload Files ({selectedFiles.length})
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border border-rose-100 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-rose-800 font-playfair flex items-center">
                <ImageIcon className="w-5 h-5 text-rose-600 mr-3" />
                Gallery Items ({galleryItems.length})
              </CardTitle>
              <CardDescription className="text-rose-600/70">Manage your uploaded photos and videos</CardDescription>
            </CardHeader>
            <CardContent>
              {galleryItems.length === 0 ? (
                <div className="text-center py-12 bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg">
                  <ImageIcon className="w-12 h-12 text-rose-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No media uploaded yet</h3>
                  <p className="text-gray-500">Upload your first photo or video to get started</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {galleryItems.map((item) => (
                    <div key={item.id} className="group">
                      <Card className="overflow-hidden border border-rose-100 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="aspect-square bg-gray-100 relative overflow-hidden">
                          {item.type === "image" ? (
                            <img
                              src={item.url || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-50">
                              <Video className="w-8 h-8 text-gray-400" />
                            </div>
                          )}

                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="flex space-x-2">
                              <Button size="sm" className="bg-white/90 hover:bg-white text-gray-700 rounded-full p-2">
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(item.id)}
                                className="bg-red-500/90 hover:bg-red-600 rounded-full p-2"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>

                          <Badge className="absolute top-2 left-2 bg-white/95 text-gray-700 text-xs">
                            {item.type === "image" ? (
                              <ImageIcon className="w-3 h-3 mr-1" />
                            ) : (
                              <Video className="w-3 h-3 mr-1" />
                            )}
                            {item.type}
                          </Badge>
                        </div>

                        <CardContent className="p-3">
                          <h3 className="font-medium text-gray-900 truncate text-sm">{item.name}</h3>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>{item.size}</span>
                            <span>{item.uploadDate}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

export default function AdminGallery() {
  return (
    <AuthGuard>
      <GalleryContent />
    </AuthGuard>
  )
}
