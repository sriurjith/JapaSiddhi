export interface CreatePersonalMantraRequest {

  mantraName: string;

  deityName?: string | null;

  mantraText: string;

  transliteration?: string | null;

  preferredJapaCount?: number;

  imageUrl?: string | null;

  audioUrl?: string | null;

}


export interface UpdatePersonalMantraRequest {

  mantraName?: string;

  deityName?: string | null;

  mantraText?: string;

  transliteration?: string | null;

  preferredJapaCount?: number;

  imageUrl?: string | null;

  audioUrl?: string | null;

  isFavorite?: boolean;

}


export interface PersonalMantraResponse {

  id: number;

  userId: number;

  mantraName: string;

  deityName: string | null;

  mantraText: string;

  transliteration: string | null;

  preferredJapaCount: number;

  imageUrl: string | null;

  audioUrl: string | null;

  isFavorite: boolean;

  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;

}