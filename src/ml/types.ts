export type ConfidenceLevel = 'High' | 'Medium' | 'Low';

export interface TopPrediction {
  index: number;
  label: string;
  confidence: number;
  confidence_level: ConfidenceLevel;
}

export interface PredictionResult {
  predicted_class_index: number;
  label: string;
  confidence: number;
  confidence_level: ConfidenceLevel;
  is_confident: boolean;
  verdict: string;
  reason: string;
  all_predictions: TopPrediction[];
}
