export interface FestivalResponse {

  id: number;

  festivalName: string;

  description: string | null;

  festivalDate: string;

  festivalType:
    | 'HINDU'
    | 'BIRTHDAY'
    | 'ANNIVERSARY'
    | 'SPECIAL';

  isPublicHoliday: boolean;

}