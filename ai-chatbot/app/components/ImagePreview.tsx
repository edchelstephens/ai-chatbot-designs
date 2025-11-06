'use client';

interface UploadedImage {
    file: File;
    dataUrl: string;
}

interface ImagePreviewProps {
    uploadedImages: UploadedImage[];
    onRemoveImage: (index: number) => void;
    onClearPreview: () => void;
}

export default function ImagePreview({ uploadedImages, onRemoveImage, onClearPreview }: ImagePreviewProps) {
    if (uploadedImages.length === 0) return null;

    return (
        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-600 dark:text-gray-400">Preview:</span>
                <div className="flex space-x-2 flex-1 overflow-x-auto">
                    {uploadedImages.map((img, index) => (
                        <div key={index} className="relative flex-shrink-0">
                            <img
                                src={img.dataUrl}
                                alt="Preview"
                                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border-2 border-gray-300 dark:border-gray-600"
                            />
                            <button
                                onClick={() => onRemoveImage(index)}
                                className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    onClick={onClearPreview}
                    className="text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 font-medium px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Clear
                </button>
            </div>
        </div>
    );
}

