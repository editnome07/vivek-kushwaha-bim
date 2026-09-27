export interface ProjectWorkflowStep {
  id: string;
  stepNumber: string;
  title: string;
  lod: string;
  description: string;
  deliverables: string[];
}

export interface SoftwareTool {
  id: string;
  name: string;
  category: string;
  role: string;
  primaryUse: string;
  integrationPoints: string[];
}

export interface ExpertiseCategory {
  id: string;
  title: string;
  code: string;
  description: string;
  skills: string[];
}

export interface RegionExposure {
  name: string;
  code: string;
  description: string;
  coordinates: { x: number; y: number };
}
