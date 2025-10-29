export type Mood = 'happy' | 'stressed' | 'tired' | 'adventurous' | 'comfort' | 'romantic';

export interface MoodConfig {
  id: Mood;
  label: string;
  emoji: string;
  description: string;
  categories: string[];
}

export const moodConfig: Record<Mood, MoodConfig> = {
  happy: {
    id: 'happy',
    label: 'Happy',
    emoji: '😊',
    description: 'Feeling joyful and energetic',
    categories: ['Dessert', 'Pasta', 'Pork', 'Chicken']
  },
  stressed: {
    id: 'stressed',
    label: 'Stressed',
    emoji: '😫',
    description: 'Need something comforting',
    categories: ['Pasta', 'Dessert', 'Chocolate', 'Comfort Food']
  },
  tired: {
    id: 'tired',
    label: 'Tired',
    emoji: '😴',
    description: 'Quick and easy meals',
    categories: ['Quick & Easy', 'One-Pot', 'Pasta', 'Chicken']
  },
  adventurous: {
    id: 'adventurous',
    label: 'Adventurous',
    emoji: '🌍',
    description: 'Ready to try something new',
    categories: ['Exotic', 'Gourmet', 'Seafood', 'Vegetarian']
  },
  comfort: {
    id: 'comfort',
    label: 'Comfort Food',
    emoji: '🍲',
    description: 'Classic comfort dishes',
    categories: ['Comfort Food', 'Pasta', 'Beef', 'Chicken']
  },
  romantic: {
    id: 'romantic',
    label: 'Romantic',
    emoji: '💝',
    description: 'Perfect for a special night',
    categories: ['Gourmet', 'Seafood', 'Dessert', 'Italian']
  }
};
