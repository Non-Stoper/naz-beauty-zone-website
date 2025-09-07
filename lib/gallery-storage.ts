export interface GalleryItem {
  id: string
  name: string
  type: "image" | "video"
  url: string
  size: string
  uploadDate: string
}

const GALLERY_STORAGE_KEY = "naz-beauty-gallery-items"

type GalleryUpdateListener = (items: GalleryItem[]) => void

class GalleryStorageManager {
  private listeners: GalleryUpdateListener[] = []
  private isInitialized = false

  // Subscribe to gallery updates
  subscribe(listener: GalleryUpdateListener): () => void {
    this.listeners.push(listener)
    // Initialize defaults when first subscriber is added
    if (!this.isInitialized) {
      this.initializeDefaults()
      this.isInitialized = true
    }
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  // Notify all listeners of updates
  private notifyListeners(items: GalleryItem[]): void {
    this.listeners.forEach((listener) => listener(items))
  }

  // Get all gallery items from localStorage with better error handling
  getItems(): GalleryItem[] {
    if (typeof window === "undefined") return this.getDefaultItems()
    try {
      const stored = localStorage.getItem(GALLERY_STORAGE_KEY)
      const items = stored ? JSON.parse(stored) : this.getDefaultItems()
      return Array.isArray(items) ? items : this.getDefaultItems()
    } catch (error) {
      console.error("Failed to load gallery items:", error)
      return this.getDefaultItems()
    }
  }

  // Save gallery items to localStorage with better error handling
  setItems(items: GalleryItem[]): void {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(items))
      // Also trigger a storage event for cross-tab synchronization
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: GALLERY_STORAGE_KEY,
          newValue: JSON.stringify(items),
        }),
      )
    } catch (error) {
      console.error("Failed to save gallery items:", error)
    }
  }

  // Add new items with better validation
  addItems(newItems: GalleryItem[]): GalleryItem[] {
    const currentItems = this.getItems()
    const validNewItems = newItems.filter((item) => item.id && item.name && item.type && item.url)
    const updatedItems = [...validNewItems, ...currentItems]
    this.setItems(updatedItems)
    this.notifyListeners(updatedItems)
    return updatedItems
  }

  // Remove item by id
  removeItem(id: string): GalleryItem[] {
    const currentItems = this.getItems()
    const updatedItems = currentItems.filter((item) => item.id !== id)
    this.setItems(updatedItems)
    this.notifyListeners(updatedItems)
    return updatedItems
  }

  // Get default items
  private getDefaultItems(): GalleryItem[] {
    return [
      {
        id: "default-1",
        name: "Bridal Makeup Artistry",
        type: "image",
        url: "/elegant-beauty-salon-interior-with-soft-pink-light.jpg",
        size: "2.4 MB",
        uploadDate: "2024-01-10",
      },
      {
        id: "default-2",
        name: "Professional Hair Styling",
        type: "image",
        url: "/beauty-salon-work-.jpg",
        size: "1.8 MB",
        uploadDate: "2024-01-08",
      },
    ]
  }

  // Initialize with default items if empty
  initializeDefaults(): void {
    const currentItems = this.getItems()
    if (currentItems.length === 0) {
      const defaultItems = this.getDefaultItems()
      this.setItems(defaultItems)
      this.notifyListeners(defaultItems)
    }
  }

  // Clear all items (for testing/reset purposes)
  clearAll(): void {
    this.setItems([])
    this.notifyListeners([])
  }

  // Get items count
  getItemsCount(): number {
    return this.getItems().length
  }
}

export const galleryStorage = new GalleryStorageManager()
