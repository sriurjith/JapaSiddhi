export interface CreateFeedbackRequest {

  userId: number;

  rating: number;

  title: string;

  message: string;

}

export interface FeedbackResponse {

  id: number;

  userId: number;

  rating: number;

  title: string;

  message: string;

  createdAt: Date;

}