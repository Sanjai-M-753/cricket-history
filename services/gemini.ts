
import { GoogleGenAI, Type } from "@google/genai";
import { CricketPlayer, EraType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const PLAYER_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    fullName: { type: Type.STRING },
    nickname: { type: Type.STRING },
    dateOfBirth: { type: Type.STRING },
    placeOfBirth: { type: Type.STRING },
    country: { type: Type.STRING },
    playingEra: { type: Type.STRING },
    role: { type: Type.STRING },
    battingStyle: { type: Type.STRING },
    bowlingStyle: { type: Type.STRING },
    formatsPlayed: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    careerStatistics: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          format: { type: Type.STRING },
          matches: { type: Type.NUMBER },
          runs: { type: Type.NUMBER },
          wickets: { type: Type.NUMBER },
          average: { type: Type.NUMBER },
          strikeRate: { type: Type.NUMBER },
          economy: { type: Type.NUMBER }
        }
      }
    },
    eraRating: { type: Type.STRING },
    majorAchievements: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    iconicMoments: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    strengths: { type: Type.STRING },
    impact: { type: Type.STRING },
    interestingFacts: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    legacySummary: { type: Type.STRING }
  },
  required: [
    "fullName", "country", "playingEra", "role", 
    "careerStatistics", "majorAchievements", "legacySummary"
  ]
};

export const fetchPlayersForEra = async (
  era: EraType, 
  filters?: { country?: string; role?: string; search?: string }
): Promise<string[]> => {
  const prompt = `List 8 legendary and impactful cricket players from the era: "${era}".
    ${filters?.country ? `Filter by country: ${filters.country}.` : ''}
    ${filters?.role ? `Include players who are: ${filters.role}.` : ''}
    ${filters?.search ? `Focus on results similar to: ${filters.search}.` : ''}
    Return ONLY a JSON array of their full names.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });

  try {
    return JSON.parse(response.text || '[]');
  } catch (e) {
    console.error("Failed to parse player names", e);
    return [];
  }
};

export const fetchPlayerDetails = async (playerName: string): Promise<CricketPlayer | null> => {
  const prompt = `Provide a detailed history and career profile for the cricketer "${playerName}".
    Include all requested sections: Stats (Test, ODI, T20 where applicable), Iconic Moments, Strengths, Impact, and Legacy.
    Ensure statistics are historically accurate. If it's a very early player (e.g. 1700s), provide estimated first-class or relevant era stats.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: PLAYER_SCHEMA
    }
  });

  try {
    return JSON.parse(response.text || '{}') as CricketPlayer;
  } catch (e) {
    console.error("Failed to parse player details", e);
    return null;
  }
};

export const fetchEraInsight = async (era: EraType): Promise<string> => {
  const prompt = `Provide a compelling 2-paragraph summary of how the game of cricket evolved during the era: "${era}".
    Highlight tactical changes, social impact, and key technological or rule advancements.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt
  });

  return response.text || '';
};
