/* eslint-disable react-hooks/exhaustive-deps */
import OpenSeaDragon from "openseadragon";
import Annotorious from "@recogito/annotorious-openseadragon";
import React, { useEffect, useState } from "react";


const OpenSeaDragonViewer = ({ image }) => {
  const [viewer, setViewer] = useState( null);

  useEffect(() => {
    if (image && viewer) {
      viewer.open(image.source);
    }
  }, [image]);

  const InitOpenseadragon = () => {

    viewer && viewer.destroy();

    const viewerInstance = OpenSeaDragon({
      id: "openSeaDragon",
      prefixUrl: "openseadragon-images/",
      animationTime: 0.5,
      blendTime: 0.1,
      constrainDuringPan: true,
      maxZoomPixelRatio: 2,
      minZoomLevel: 1,
      visibilityRatio: 1,
      zoomPerScroll: 2
    })

    setViewer(viewerInstance);

    let anno = Annotorious(viewerInstance);

    console.log('checking anno', anno)

    anno.on("createAnnotation", handleCreateAnnotation);

    anno.on("updateAnnotation", handleUpdateAnnotation);

    anno.on("deleteAnnotation", handleDeleteAnnotation);
  };


  const handleCreateAnnotation = annotation => {
    console.log("checking create annotation", annotation)
  }

  const handleUpdateAnnotation = annotation => {
    console.log("checking update annotation", annotation)
  }

  const handleDeleteAnnotation = annotation => {
    console.log("checking delete annotation", annotation)
  }


  useEffect(() => {
    InitOpenseadragon();
    return () => {
        viewer && viewer.destroy();
    };
  }, []);

  return (
  <div 
  id="openSeaDragon" 
  style={{
    height: "800px",
    width: "1200px"
  }}
  >
  </div>
  );
};

export { OpenSeaDragonViewer };
