import { Request, Response } from 'express';
import axios from 'axios';

interface GoogleReview {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface GooglePlaceResponse {
  result: {
    name: string;
    rating: number;
    user_ratings_total: number;
    reviews: GoogleReview[];
  };
  status: string;
}

export const getGoogleReviews = async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
      return res.status(500).json({ 
        message: 'Google Places API credentials not configured' 
      });
    }

    // Hacer request a Google Places API
    const response = await axios.get<GooglePlaceResponse>(
      `https://maps.googleapis.com/maps/api/place/details/json`,
      {
        params: {
          place_id: placeId,
          fields: 'name,rating,user_ratings_total,reviews',
          key: apiKey,
          language: 'es'
        }
      }
    );

    if (response.data.status !== 'OK') {
      return res.status(500).json({ 
        message: 'Error fetching Google reviews',
        error: response.data.status
      });
    }

    const { result } = response.data;
    
    // Transformar las reseñas al formato de nuestra aplicación
    const reviews = result.reviews?.map((review) => ({
      name: review.author_name,
      avatar: review.profile_photo_url,
      stars: review.rating,
      text: review.text,
      date: new Date(review.time * 1000).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      relativeTime: review.relative_time_description,
      authorUrl: review.author_url,
      active: true,
      order: 0
    })) || [];

    res.json({
      placeName: result.name,
      averageRating: result.rating,
      totalReviews: result.user_ratings_total,
      reviews: reviews
    });

  } catch (error: any) {
    console.error('Error fetching Google reviews:', error.message);
    res.status(500).json({ 
      message: 'Error fetching reviews from Google',
      error: error.message
    });
  }
};

export const getPlaceInfo = async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
      return res.status(500).json({ 
        message: 'Google Places API credentials not configured' 
      });
    }

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json`,
      {
        params: {
          place_id: placeId,
          fields: 'name,rating,user_ratings_total,formatted_address,formatted_phone_number,website,opening_hours,photos',
          key: apiKey,
          language: 'es'
        }
      }
    );

    if (response.data.status !== 'OK') {
      return res.status(500).json({ 
        message: 'Error fetching place info',
        error: response.data.status
      });
    }

    res.json(response.data.result);

  } catch (error: any) {
    console.error('Error fetching place info:', error.message);
    res.status(500).json({ 
      message: 'Error fetching place info from Google',
      error: error.message
    });
  }
};
