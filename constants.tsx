
import { EraType, EraInfo } from './types';

export const ERAS: EraInfo[] = [
  {
    id: 'early',
    name: EraType.EARLY_PIONEERS,
    description: 'The foundation of the game. Cricket moves from a rural pastime to a structured sport with the MCC and early legends of the 18th century.',
    keyEvolution: 'The transition from underarm to roundarm bowling and the development of the straight bat.',
    didYouKnow: 'The earliest known reference to cricket dates back to 1597, in a court case over a piece of land in Guildford, Surrey.'
  },
  {
    id: 'golden',
    name: EraType.GOLDEN_AGE,
    description: 'The era of Grace, Bradman, and the birth of international tests. Defining the techniques and rivalries that still exist today.',
    keyEvolution: 'Establishment of Test Cricket and the introduction of the Ashes. Professionalism begins to take root.',
    didYouKnow: 'Don Bradman needed only 4 runs in his final innings to retire with a Test average of 100. He was out for a duck.'
  },
  {
    id: 'postwar',
    name: EraType.POST_WAR,
    description: 'Cricket spreads globally. Modern legends from the Caribbean, Pakistan, and India emerge during a time of intense social change.',
    keyEvolution: 'The rise of fast bowling and more aggressive captaincy styles.',
    didYouKnow: 'The 1960-61 Test between Australia and West Indies in Brisbane was the first-ever tied Test in history.'
  },
  {
    id: 'odi',
    name: EraType.ODI_REVOLUTION,
    description: 'The birth of the World Cup and color clothing. Cricket becomes a televised spectacle with high-octane drama.',
    keyEvolution: 'Limited overs cricket transforms batting intent and athletic fielding standards.',
    didYouKnow: 'The first World Cup in 1975 was played with 60-over matches and white clothing.'
  },
  {
    id: 'modern',
    name: EraType.MODERN_T20,
    description: 'The franchise explosion. T20 cricket dominates the landscape, introducing innovative shots and global superstars.',
    keyEvolution: 'Power-hitting, ramp shots, and mystery spin revolutionize the tactical battle.',
    didYouKnow: 'The first T20 International was played between Australia and New Zealand in 2005 as a light-hearted exhibition match.'
  }
];

export const COUNTRIES = [
  'England', 'Australia', 'South Africa', 'West Indies', 'India', 
  'Pakistan', 'New Zealand', 'Sri Lanka', 'Zimbabwe', 'Bangladesh', 
  'Afghanistan', 'Ireland'
];

export const ROLES = ['Batsman', 'Bowler', 'All-rounder', 'Wicketkeeper'];
