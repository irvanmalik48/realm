"use client";

import React, { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import type { Area, Point } from "react-easy-crop";
import { getCroppedImg } from "@/lib/crop-image";
import {
  UploadCloud,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Check,
  X,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface AvatarCropDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCropComplete: (croppedFile: File) => Promise<void>;
  isUploading?: boolean;
}

export function AvatarCropDialog({
  isOpen,
  onClose,
  onCropComplete,
  isUploading = false,
}: AvatarCropDialogProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onCropChange = (newCrop: Point) => {
    setCrop(newCrop);
  };

  const onZoomChange = (newZoom: number) => {
    setZoom(newZoom);
  };

  const onCropCompleteCallback = useCallback(
    (_croppedArea: Area, currentCroppedAreaPixels: Area) => {
      setCroppedAreaPixels(currentCroppedAreaPixels);
    },
    []
  );

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImageSrc(reader.result?.toString() || null);
      setZoom(1);
      setCrop({ x: 0, y: 0 });
    });
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels);
      await onCropComplete(croppedFile);
      handleReset();
    } catch (err) {
      console.error("Failed to crop image:", err);
    }
  };

  const handleReset = () => {
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <ImageIcon className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {imageSrc ? "Crop & Adjust Avatar" : "Upload Profile Picture"}
              </h3>
              <p className="text-[11px] text-muted-foreground">
                {imageSrc ? "Drag to reposition and adjust zoom." : "Drag & drop your image or browse files."}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5">
          {!imageSrc ? (
            /* Drag and Drop Upload Area */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-200 ${
                isDraggingOver
                  ? "border-primary bg-primary/10 scale-[1.01]"
                  : "border-border/80 bg-muted/20 hover:border-primary/60 hover:bg-muted/40"
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleInputChange}
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="hidden"
              />
              <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shadow-xs">
                <UploadCloud className="size-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">
                  Click to browse or drag and drop an image
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Supports PNG, JPG, WebP, GIF (up to 50MB)
                </p>
              </div>
            </div>
          ) : (
            /* Interactive Cropper Area */
            <div className="space-y-4">
              <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden bg-black/90">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={onCropChange}
                  onCropComplete={onCropCompleteCallback}
                  onZoomChange={onZoomChange}
                />
              </div>

              {/* Zoom & Reset Controls */}
              <div className="flex items-center gap-3 px-1">
                <ZoomOut className="size-4 text-muted-foreground shrink-0" />
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.05}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-muted rounded-lg appearance-none cursor-pointer"
                />
                <ZoomIn className="size-4 text-muted-foreground shrink-0" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setZoom(1);
                    setCrop({ x: 0, y: 0 });
                  }}
                  className="text-xs h-7 px-2 shrink-0 cursor-pointer text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="size-3.5" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-border/60 bg-muted/20">
          {imageSrc ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              disabled={isUploading}
              className="text-xs cursor-pointer"
            >
              Choose another
            </Button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClose}
              disabled={isUploading}
              className="text-xs cursor-pointer"
            >
              Cancel
            </Button>
            {imageSrc && (
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isUploading}
                className="text-xs flex items-center gap-1.5 cursor-pointer"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Check className="size-3.5" />
                    <span>Crop & Save</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
