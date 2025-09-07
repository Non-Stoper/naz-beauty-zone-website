"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageIcon, Video, X } from "lucide-react"
import { galleryStorage, type GalleryItem } from "@/lib/gallery-storage"

export const GallerySection = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])

  useEffect(() => {
    galleryStorage.initializeDefaults()
    setGalleryItems(galleryStorage.getItems())

    const unsubscribe = galleryStorage.subscribe((updatedItems) => {
      setGalleryItems(updatedItems)
    })

    return unsubscribe
  }, [])

  return (
    <>
      <section id="gallery" className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-rose-800 mb-4">Our Beautiful Work</h2>
            <p className="text-lg text-rose-600 max-w-2xl mx-auto">
              Discover the artistry and elegance of our beauty treatments through our gallery
            </p>
          </div>

          {galleryItems.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-rose-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-rose-700 mb-2">Gallery Coming Soon</h3>
              <p className="text-rose-500">We're preparing beautiful photos to showcase our work</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryItems.map((item) => (
                <Card
                  key={item.id}
                  className="group overflow-hidden border-rose-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="aspect-square relative overflow-hidden">
                    {item.type === "image" ? (
                      <img
                        src={item.url || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center relative">
                        {item.url && item.url.startsWith("data:video") ? (
                          <video src={item.url} className="w-full h-full object-cover" muted preload="metadata" />
                        ) : (
                          <Video className="w-12 h-12 text-rose-400" />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Video className="w-12 h-12 text-white" />
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-rose-200 flex items-center">
                        {item.type === "image" ? (
                          <ImageIcon className="w-4 h-4 mr-1" />
                        ) : (
                          <Video className="w-4 h-4 mr-1" />
                        )}
                        {item.type}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal for viewing full-size images/videos */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              onClick={() => setSelectedItem(null)}
              className="absolute -top-12 right-0 bg-white/20 hover:bg-white/30 text-white border-0"
              size="sm"
            >
              <X className="w-5 h-5" />
            </Button>

            {selectedItem.type === "image" ? (
              <img
                src={selectedItem.url || "/placeholder.svg"}
                alt={selectedItem.name}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            ) : (
              <video src={selectedItem.url} controls className="max-w-full max-h-full rounded-lg" preload="metadata" />
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-lg">
              <h3 className="text-white text-xl font-medium">{selectedItem.name}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
