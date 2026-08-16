// ArchiMate diagram setup for Cytoscape.js.
// Loaded by cytoscape_example.html AFTER the data script (which defines the
// `archimateElements` global). Defines the diagram stylesheet
// (`archimateStylesheet`), the badge config (`archimateBadges`), creates the
// Cytoscape instance (`cy`), and applies the ArchiMate type badges.

// Register the Dagre layout extension
cytoscape.use(cytoscapeDagre);

const archimateStylesheet = [
  // Base Element Styles
  {
    selector: 'node',
    style: {
      'label': 'data(label)',
      'color': '#111827',
      'font-size': '11px',
      'font-weight': '600',
      'text-valign': 'center',
      'text-halign': 'center',
      'text-wrap': 'wrap',
      'text-max-width': '120px',
      'border-width': 1.5,
      'width': '130px',
      'height': '60px',
      'shape': 'rectangle'
    }
  },
  // Compound Container Boundaries
  // The header text is anchored at its BOTTOM-LEFT corner (text-halign: right
  // + text-valign: top — with these two, Cytoscape's anchor is the label's
  // bottom-left corner) and then offset per node by positionParentHeaders()
  // so it sits just ABOVE the box's top-left corner (outside the box).
  {
    selector: ':parent',
    style: {
      'background-opacity': 0.08,
      'border-width': 1.5,
      'border-style': 'dashed',
      'text-valign': 'top',
      'text-halign': 'right',
      'font-size': '12px',
      'font-weight': 'bold',
      'padding': '24px'
    }
  },
  // Layer Colors
  {
    selector: 'node[layer="Business"], :parent[layer="Business"]',
    style: {
      'background-color': '#edd779',
      'border-color': '#C7A300'
    }
  },
  {
    selector: 'node[layer="Application"], :parent[layer="Application"]',
    style: {
      'background-color': '#b0d0d9',
      'border-color': '#009999'
    }
  },
  {
    selector: 'node[layer="Technology"], :parent[layer="Technology"]',
    style: {
      'background-color': '#bcd9ae',
      'border-color': '#5C8A42'
    }
  },
  {
    selector: 'node[layer="Strategy"], :parent[layer="Strategy"]',
    style: {
      'background-color': '#efbd5d',
      'border-color': '#b38226'
    }
  },
  {
    selector: 'node[layer="Motivation"], :parent[layer="Motivation"]',
    style: {
      'background-color': '#e3cfe8',
      'border-color': '#8a5fa0'
    }
  },
  {
    selector: 'node[layer="Implementation"], :parent[layer="Implementation"]',
    style: {
      'background-color': '#c9d9e8',
      'border-color': '#4f7ba8'
    }
  },
  {
    selector: 'node[layer="Basic"], :parent[layer="Basic"]',
    style: {
      'background-color': '#e0e0e0',
      'border-color': '#8a8a8a'
    }
  },
  // Shapes by Aspect
  {
    selector: 'node[aspect="Behavior"]',
    style: { 'shape': 'round-rectangle' }
  },
  {
    selector: 'node[concept="BusinessService"], node[concept="ApplicationService"], node[concept="TechnologyService"]',
    style: { 'shape': 'round-rectangle', 'border-style': 'solid' }
  },
  {
    selector: 'node[aspect="PassiveStructure"]',
    style: { 'shape': 'rectangle' }
  },
  // Badge images (ArchiMate type icons) are configured in the archimateBadges
  // map below and applied per node by applyArchimateBadges(). They are linked
  // SVG files from the image/ folder, not embedded.

  // Base Edge Style
  {
    selector: 'edge',
    style: {
      'width': 1.5,
      'curve-style': 'bezier',
      'font-size': '9px',
      'color': '#4b5563',
      'text-rotation': 'autorotate',
      'text-background-color': '#ffffff',
      'text-background-opacity': 0.8,
      'text-background-padding': '3px',
      'label': 'data(label)'
    }
  },

  // ==========================================
  // STRUCTURAL RELATIONSHIPS
  // ==========================================

  // Aggregation (Solid + Hollow Diamond at source)
  {
    selector: 'edge[relation="Aggregation"]',
    style: {
      'line-style': 'solid',
      'line-color': '#374151',
      'source-arrow-shape': 'diamond',
      'source-arrow-color': '#374151',
      'source-arrow-fill': 'hollow'
    }
  },

  // Composition (Solid + Filled Diamond at source)
  {
    selector: 'edge[relation="Composition"]',
    style: {
      'line-style': 'solid',
      'line-color': '#374151',
      'source-arrow-shape': 'diamond',
      'source-arrow-color': '#374151',
      'source-arrow-fill': 'filled'
    }
  },

  // Assignment (Solid + Filled Circle at source + Arrowhead at target)
  {
    selector: 'edge[relation="Assignment"]',
    style: {
      'line-style': 'solid',
      'line-color': '#374151',
      'source-arrow-shape': 'circle',
      'source-arrow-color': '#374151',
      'source-arrow-fill': 'filled',
      'target-arrow-shape': 'triangle',
      'target-arrow-color': '#374151',
      'target-arrow-fill': 'filled'
    }
  },

  // Realization (Dotted/Dashed + Hollow Triangle at target)
  {
    selector: 'edge[relation="Realization"]',
    style: {
      'line-style': 'dashed',
      'line-dash-pattern': [5, 3],
      'line-color': '#374151',
      'target-arrow-shape': 'triangle',
      'target-arrow-color': '#374151',
      'target-arrow-fill': 'hollow'
    }
  },

  // ==========================================
  // DEPENDENCY RELATIONSHIPS
  // ==========================================

  // Serving (Solid + Open/Vee Arrow at target)
  {
    selector: 'edge[relation="Serving"]',
    style: {
      'line-style': 'solid',
      'line-color': '#374151',
      'target-arrow-shape': 'vee',
      'target-arrow-color': '#374151'
    }
  },

  // Access - Unidirectional (Dotted + Open/Vee Arrow at target)
  {
    selector: 'edge[relation="Access"]',
    style: {
      'line-style': 'dotted',
      'line-color': '#6b7280',
      'target-arrow-shape': 'vee',
      'target-arrow-color': '#6b7280'
    }
  },

  // Access - Bidirectional (Dotted + Open/Vee Arrows at both ends)
  {
    selector: 'edge[relation="Access-Bidirectional"]',
    style: {
      'line-style': 'dotted',
      'line-color': '#6b7280',
      'source-arrow-shape': 'vee',
      'source-arrow-color': '#6b7280',
      'target-arrow-shape': 'vee',
      'target-arrow-color': '#6b7280'
    }
  },

  // Influence (Dashed + Open/Vee Arrow at target)
  {
    selector: 'edge[relation="Influence"]',
    style: {
      'line-style': 'dashed',
      'line-dash-pattern': [6, 4],
      'line-color': '#374151',
      'target-arrow-shape': 'vee',
      'target-arrow-color': '#374151'
    }
  },

  // Association - Directed (Solid + Open/Vee Half-Arrow at target)
  {
    selector: 'edge[relation="Association-Directed"]',
    style: {
      'line-style': 'solid',
      'line-color': '#374151',
      'target-arrow-shape': 'vee',
      'target-arrow-color': '#374151'
    }
  },

  // Association - Undirected (Plain Solid Line)
  {
    selector: 'edge[relation="Association"]',
    style: {
      'line-style': 'solid',
      'line-color': '#374151',
      'target-arrow-shape': 'none'
    }
  },

  // ==========================================
  // DYNAMIC RELATIONSHIPS
  // ==========================================

  // Triggering (Solid + Filled Triangle at target)
  {
    selector: 'edge[relation="Triggering"]',
    style: {
      'line-style': 'solid',
      'line-color': '#111827',
      'target-arrow-shape': 'triangle',
      'target-arrow-color': '#111827',
      'target-arrow-fill': 'filled'
    }
  },

  // Flow (Dashed + Filled Triangle at target)
  {
    selector: 'edge[relation="Flow"]',
    style: {
      'line-style': 'dashed',
      'line-dash-pattern': [6, 3],
      'line-color': '#111827',
      'target-arrow-shape': 'triangle',
      'target-arrow-color': '#111827',
      'target-arrow-fill': 'filled'
    }
  },

  // ==========================================
  // OTHER RELATIONSHIPS
  // ==========================================

  // Specialization (Solid + Hollow Triangle at target)
  {
    selector: 'edge[relation="Specialization"]',
    style: {
      'line-style': 'solid',
      'line-color': '#374151',
      'target-arrow-shape': 'triangle',
      'target-arrow-color': '#374151',
      'target-arrow-fill': 'hollow'
    }
  },

  // ==========================================
  // JUNCTIONS (Geïmplementeerd als knooppunten / nodes)
  // ==========================================

  // And-Junction (Gevulde zwarte cirkel)
  {
    selector: 'node[type="And-Junction"]',
    style: {
      'shape': 'ellipse',
      'width': 14,
      'height': 14,
      'background-color': '#111827',
      'border-width': 0,
      'label': ''
    }
  },

  // Or-Junction (Open omrande cirkel)
  {
    selector: 'node[type="Or-Junction"]',
    style: {
      'shape': 'ellipse',
      'width': 14,
      'height': 14,
      'background-color': '#ffffff',
      'border-width': 1.5,
      'border-color': '#111827',
      'label': ''
    }
  }
];

// --- ArchiMate type badges (linked SVG files from the image/ folder) ---
// Each entry maps an ArchiMate concept to its badge file and size. To add a
// new badge type later: drop the SVG into the image/ folder and add one
// entry here. The icon is drawn in model pixels, so it scales together with
// the node when zooming. All badge SVGs are square (50x50), so the badge
// draw size is square too (width == height) to avoid distortion.
const archimateBadges = {
  // Application layer
  ApplicationCollaboration: { file: 'image/application_collaboration.svg', width: 20, height: 20, offsetX: -3, offsetY: 4 },
  ApplicationComponent:     { file: 'image/application_component.svg',     width: 20, height: 20, offsetX: -2, offsetY: 2 },
  ApplicationDataObject:    { file: 'image/application_data_object.svg',   width: 20, height: 20, offsetX: -3, offsetY: 4 },
  ApplicationEvent:         { file: 'image/application_event.svg',         width: 20, height: 20, offsetX: -3, offsetY: 4 },
  ApplicationFunction:      { file: 'image/application_function.svg',      width: 20, height: 20, offsetX: -3, offsetY: 4 },
  ApplicationInteraction:   { file: 'image/application_interaction.svg',   width: 20, height: 20, offsetX: -3, offsetY: 4 },
  ApplicationInterface:     { file: 'image/application_interface.svg',     width: 20, height: 20, offsetX: -3, offsetY: 4 },
  ApplicationProcess:       { file: 'image/application_process.svg',       width: 20, height: 20, offsetX: -3, offsetY: 4 },
  ApplicationService:       { file: 'image/application_service.svg',       width: 20, height: 20, offsetX: -3, offsetY: 4 },
  // Business layer
  BusinessActor:            { file: 'image/business_actor.svg',            width: 20, height: 20, offsetX: -3, offsetY: 4 },
  BusinessCollaboration:    { file: 'image/business_collaboration.svg',    width: 20, height: 20, offsetX: -3, offsetY: 4 },
  BusinessContract:         { file: 'image/business_contract.svg',         width: 20, height: 20, offsetX: -3, offsetY: 4 },
  BusinessEvent:            { file: 'image/business_event.svg',            width: 20, height: 20, offsetX: -3, offsetY: 4 },
  BusinessFunction:         { file: 'image/business_function.svg',         width: 20, height: 20, offsetX: -3, offsetY: 4 },
  BusinessInteraction:      { file: 'image/business_interaction.svg',      width: 20, height: 20, offsetX: -3, offsetY: 4 },
  BusinessInterface:        { file: 'image/business_interface.svg',        width: 20, height: 20, offsetX: -3, offsetY: 4 },
  BusinessObject:           { file: 'image/business_object.svg',           width: 20, height: 20, offsetX: -3, offsetY: 4 },
  BusinessProcess:          { file: 'image/business_process.svg',          width: 20, height: 20, offsetX: -2, offsetY: 2 },
  BusinessProduct:          { file: 'image/business_product.svg',          width: 20, height: 20, offsetX: -3, offsetY: 4 },
  BusinessRepresentation:   { file: 'image/business_representation.svg',   width: 20, height: 20, offsetX: -3, offsetY: 4 },
  BusinessRole:             { file: 'image/business_role.svg',             width: 20, height: 20, offsetX: -3, offsetY: 4 },
  BusinessService:          { file: 'image/business_service.svg',          width: 20, height: 20, offsetX: -3, offsetY: 4 },
  // Technology layer (includes the physical elements, per ArchiMate 3.x)
  PhysicalDistributionNetwork: { file: 'image/physical_distribution_network.svg', width: 20, height: 20, offsetX: -3, offsetY: 4 },
  PhysicalEquipment:           { file: 'image/physical_equipment.svg',           width: 20, height: 20, offsetX: -3, offsetY: 4 },
  PhysicalFacility:            { file: 'image/physical_facility.svg',            width: 20, height: 20, offsetX: -3, offsetY: 4 },
  PhysicalMaterial:            { file: 'image/physical_material.svg',            width: 20, height: 20, offsetX: -3, offsetY: 4 },
  TechnologyArtifact:          { file: 'image/technology_artifact.svg',          width: 20, height: 20, offsetX: -3, offsetY: 4 },
  TechnologyCollaboration:     { file: 'image/technology_collaboration.svg',     width: 20, height: 20, offsetX: -3, offsetY: 4 },
  TechnologyCommunicationNetwork: { file: 'image/technology_communication_network.svg', width: 20, height: 20, offsetX: -3, offsetY: 4 },
  TechnologyDevice:            { file: 'image/technologydevice.svg',              width: 20, height: 20, offsetX: -3, offsetY: 4 },
  TechnologyEvent:             { file: 'image/technology_event.svg',             width: 20, height: 20, offsetX: -3, offsetY: 4 },
  TechnologyFunction:          { file: 'image/technology_function.svg',          width: 20, height: 20, offsetX: -3, offsetY: 4 },
  TechnologyInterface:         { file: 'image/technology_interface.svg',         width: 20, height: 20, offsetX: -3, offsetY: 4 },
  TechnologyNode:              { file: 'image/technology_node.svg',              width: 20, height: 20, offsetX: -3, offsetY: 4 },
  TechnologyPath:              { file: 'image/technology_path.svg',              width: 20, height: 20, offsetX: -3, offsetY: 4 },
  TechnologyProcess:           { file: 'image/technology_process.svg',           width: 20, height: 20, offsetX: -3, offsetY: 4 },
  TechnologyService:           { file: 'image/technology_service.svg',           width: 20, height: 20, offsetX: -3, offsetY: 4 },
  TechnologySystemSoftware:    { file: 'image/technology_system_software.svg',   width: 20, height: 20, offsetX: -3, offsetY: 4 },
  TechnologyInteraction:       { file: 'image/technology_interaction.svg',       width: 20, height: 20, offsetX: -3, offsetY: 4 },
  // Strategy layer
  StrategyCapability:       { file: 'image/strategy_capability.svg',       width: 20, height: 20, offsetX: -3, offsetY: 4 },
  StrategyCourseOfAction:   { file: 'image/strategy_course_of_action.svg', width: 20, height: 20, offsetX: -3, offsetY: 4 },
  StrategyResource:         { file: 'image/strategy_resource.svg',         width: 20, height: 20, offsetX: -3, offsetY: 4 },
  StrategyValueStream:      { file: 'image/strategy_value_stream.svg',     width: 20, height: 20, offsetX: -3, offsetY: 4 },
  // Motivation layer
  MotivationAssessment:     { file: 'image/motivation_assessment.svg',     width: 20, height: 20, offsetX: -3, offsetY: 4 },
  MotivationConstraint:     { file: 'image/motivation_constraint.svg',     width: 20, height: 20, offsetX: -3, offsetY: 4 },
  MotivationDriver:         { file: 'image/motivation_driver.svg',         width: 20, height: 20, offsetX: -3, offsetY: 4 },
  MotivationGoal:           { file: 'image/motivation_goal.svg',           width: 20, height: 20, offsetX: -3, offsetY: 4 },
  MotivationMeaning:        { file: 'image/motivation_meaning.svg',        width: 20, height: 20, offsetX: -3, offsetY: 4 },
  MotivationOutcome:        { file: 'image/motivation_outcome.svg',        width: 20, height: 20, offsetX: -3, offsetY: 4 },
  MotivationPrinciple:      { file: 'image/motivation_principle.svg',      width: 20, height: 20, offsetX: -3, offsetY: 4 },
  MotivationRequirement:    { file: 'image/motivation_requirement.svg',    width: 20, height: 20, offsetX: -3, offsetY: 4 },
  MotivationStakeholder:    { file: 'image/motivation_stakeholder.svg',    width: 20, height: 20, offsetX: -3, offsetY: 4 },
  MotivationValue:          { file: 'image/motivation_value.svg',          width: 20, height: 20, offsetX: -3, offsetY: 4 },
  // Implementation & Migration layer
  ImplementationDeliverable:{ file: 'image/implementation_deliverable.svg', width: 20, height: 20, offsetX: -3, offsetY: 4 },
  ImplementationEvent:     { file: 'image/implementation_event.svg',     width: 20, height: 20, offsetX: -3, offsetY: 4 },
  ImplementationGap:       { file: 'image/implementation_gap.svg',       width: 20, height: 20, offsetX: -3, offsetY: 4 },
  ImplementationPlateau:    { file: 'image/implementation_plateau.svg',    width: 20, height: 20, offsetX: -3, offsetY: 4 },
  ImplementationWorkPackage:{ file: 'image/implementation_workpackage.svg', width: 20, height: 20, offsetX: -3, offsetY: 4 },
  // Basic / Other elements
  BasicLocation:            { file: 'image/basic_location.svg',            width: 20, height: 20, offsetX: -3, offsetY: 4 }
};

// Anchor each badged node's icon to its top-right corner.
function applyArchimateBadges(cy) {
  cy.nodes().forEach((node) => {
    const badge = archimateBadges[node.data('concept')];
    if (!badge) return;
    node.style({
      'background-image': badge.file,
      // 'null' disables CORS mode on the <img>: without this, Cytoscape sets
      // crossOrigin='anonymous' (the default) and browsers block file:// SVG
      // loads in CORS mode, so the badge would silently never render when the
      // page is opened from disk. For cross-origin (CDN) images later, use 'anonymous'.
      'background-image-crossorigin': 'null',
      'background-fit': 'none',
      'background-width': badge.width + 'px',
      'background-height': badge.height + 'px',
      'background-position-x': '100%', // right edge of the node
      'background-position-y': '0%',   // top edge of the node
      'background-offset-x': badge.offsetX + 'px',
      'background-offset-y': badge.offsetY + 'px',
      'background-clip': 'none'        // allow the badge to draw over the border
    });
    // Diagnostic: warn in the console if the badge file cannot be loaded.
    const probe = new Image();
    probe.onerror = () => console.warn(`[badge] could not load "${badge.file}" — is the file next to the HTML inside the image/ folder?`);
    probe.src = badge.file;
  });
}

// Initialize Cytoscape Instance
const cy = cytoscape({
  container: document.getElementById('cy'),
  elements: archimateElements,
  style: archimateStylesheet,
  layout: {
    name: 'dagre',
    rankDir: 'TB', // Top to Bottom flow
    nodeSep: 60,
    rankSep: 80,
    padding: 50
  },
  boxSelectionEnabled: false,
  autounselectify: false
});
window.cy = cy; // handy for debugging from the browser console

// Keep each parent (layer container) title just ABOVE the top-left corner of
// its dashed box (outside the box), and re-position it live whenever the box
// resizes — e.g. while dragging a child node. The label anchor is the label's
// BOTTOM-LEFT corner (text-halign: right + text-valign: top); its default
// position is one `padding` below the node's top-right corner, so we offset
// it per node using the node's current size. The X offset depends on the node
// width, which changes as the box grows/shrinks, so it is recomputed on every
// render — guarded so the style is only written when the value changed.
function positionParentHeaders() {
  cy.nodes(':parent').forEach((node) => {
    const marginX = -(node.width() + node.padding() - 6); // 6px in from the left border
    const marginY = node.padding() - 4;                   // label bottom edge 4px above the top border
    const curX = node.pstyle('text-margin-x').pfValue;
    const curY = node.pstyle('text-margin-y').pfValue;
    if (curX !== marginX || curY !== marginY) {
      node.style({
        'text-margin-x': marginX + 'px',
        'text-margin-y': marginY + 'px'
      });
    }
  });
}
cy.on('render', positionParentHeaders); // re-run on every redraw (keeps the title glued to the box as it resizes)
positionParentHeaders();                // apply now

applyArchimateBadges(cy); // call again after adding elements if the graph changes later
