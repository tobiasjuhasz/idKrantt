// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  
  if (msg.type === 'create-json') {
    var nodes = new Array();
    for (const node of figma.currentPage.selection) {
      nodes.push(json_from_node(node));
    }
    figma.ui.postMessage(JSON.stringify(nodes));
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
};

function json_from_node(node: SceneNode){
        console.log(node);
        // We will create a new json object
        var json_node = {
          name: node.name,
          absoluteTransform: node.absoluteTransform,
          backgroundStyleId: node.backgroundStyleId,
          backgrounds: node.backgrounds,
          blendMode: node.blendMode,
          bottomLeftRadius: node.bottomLeftRadius,
          bottomRightRadius: node.bottomRightRadius,
          clipsContent: node.clipsContent,
          constrainProportions: node.constrainProportions,
          constraints: node.constraints,
          cornerRadius: node.cornerRadius,
          cornerSmoothing: node.cornerSmoothing,
          counterAxisAlignItems: node.counterAxisAlignItems,
          counterAxisSizingMode: node.counterAxisSizingMode,
          dashPattern: node.dashPattern,
          effectStyleId: node.effectStyleId,
          effects: node.effects,
          expanded: node.expanded,
          exportSettings: node.exportSettings,
          fillStyleId: node.fillStyleId,
          fills: node.fills,
          gridStyleId: node.gridStyleId,
          guides: node.guides,
          height: node.height,
          isMask: node.isMask,
          itemSpacing: node.itemSpacing,
          layoutAlign: node.layoutAlign,
          layoutGrids: node.layoutGrids,
          layoutGrow: node.layoutGrow,
          layoutMode: node.layoutMode,
          locked: node.locked,
          numberOfFixedChildren: node.numberOfFixedChildren,
          opacity: node.opacity,
          overflowDirection: node.overflowDirection,
          overlayBackground: node.overlayBackground,
          overlayBackgroundInteraction: node.overlayBackgroundInteraction,
          overlayPositionType: node.overlayPositionType,
          paddingBottom: node.paddingBottom,
          paddingLeft: node.paddingLeft,
          paddingRight: node.paddingRight,
          paddingTop: node.paddingTop,
          parent: node.parent,
          primaryAxisAlignItems: node.primaryAxisAlignItems,
          primaryAxisSizingMode: node.primaryAxisSizingMode,
          reactions: node.reactions,
          relativeTransform: node.relativeTransform,
          removed: node.removed,
          rotation: node.rotation,
          strokeAlign: node.strokeAlign,
          strokeCap: node.strokeCap,
          strokeJoin: node.strokeJoin,
          strokeMiterLimit: node.strokeMiterLimit,
          strokeStyleId: node.strokeStyleId,
          strokeWeight: node.strokeWeight,
          strokes: node.strokes,
          topLeftRadius: node.topLeftRadius,
          topRightRadius: node.topRightRadius,
          visible: node.visible,
          width: node.width,
          x: node.x,
          y: node.y,
        }
          var children = [];
          if(node.children !== undefined)
            Object.entries(node.children).forEach(c => {
              console.log(c[1]);
              var child = c[1];
              if(child !== undefined)
                var theChild = json_from_node(child); 
                children.push([theChild]);
            });
        
        json_node["children"] = children;

        return json_node;
}