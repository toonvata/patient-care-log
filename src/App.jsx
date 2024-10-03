import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";

const queryClient = new QueryClient();

const App = () => {
  const [canvas, setCanvas] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const initCanvas = new fabric.Canvas(canvasRef.current, {
      width: 600,
      height: 800,
    });

    fabric.Image.fromURL('https://i.postimg.cc/G9n4kJq8/Untitled-design.png', (img) => {
      img.scaleToWidth(initCanvas.width);
      initCanvas.setBackgroundImage(img, initCanvas.renderAll.bind(initCanvas));
      initCanvas.isDrawingMode = true;
      initCanvas.freeDrawingBrush.width = 2;
      initCanvas.freeDrawingBrush.color = "#0d0000";
    });

    setCanvas(initCanvas);

    return () => {
      initCanvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (canvas) {
      canvas.on('path:created', saveCanvasState);
      loadCanvasState();
    }
  }, [canvas]);

  const saveCanvasState = () => {
    if (canvas) {
      localStorage.setItem('bodyChartState', JSON.stringify(canvas.toJSON()));
    }
  };

  const loadCanvasState = () => {
    if (canvas) {
      const savedState = localStorage.getItem('bodyChartState');
      if (savedState) {
        canvas.loadFromJSON(savedState, canvas.renderAll.bind(canvas));
      }
    }
  };

  const clearBodyChart = () => {
    if (canvas) {
      canvas.clear();
      fabric.Image.fromURL('https://i.postimg.cc/G9n4kJq8/Untitled-design.png', (img) => {
        img.scaleToWidth(canvas.width);
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      fabric.Image.fromURL(event.target.result, (img) => {
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width / img.width,
          scaleY: canvas.height / img.height,
        });
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {navItems.map(({ to, page }) => (
              <Route key={to} path={to} element={page} />
            ))}
          </Routes>
        </BrowserRouter>
        <div id="bodyChartContainer">
          <canvas ref={canvasRef} id="bodyChart" />
        </div>
        <input type="file" id="imageUpload" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
        <label htmlFor="imageUpload" id="uploadLabel">อัพโหลดรูปภาพ</label>
        <button onClick={clearBodyChart}>ล้างรูปวาด</button>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;