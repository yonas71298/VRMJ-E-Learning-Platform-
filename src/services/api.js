const SKILLS_URL = '/data/skills.json';
const USERS_KEY = 'skillswap_users';
const SESSION_KEY = 'skillswap_session';
const FAVORITES_KEY = 'skillswap_favorites';
const MATCHES_KEY = 'skillswap_matches';

export async function fetchSkills() {
  const response = await fetch(SKILLS_URL);
  if (!response.ok) {
    throw new Error('Failed to load skills. Please try again.');
  }
  return response.json();
}

export function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveUser(user) {
  const users = getStoredUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return user;
}

export function findUserByEmail(email) {
  return getStoredUsers().find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
}

export function setSession(user) {
  const session = {
    id: user.id,
    name: user.name,
    email: user.email,
    skillsOffer: user.skillsOffer || '',
    skillsWant: user.skillsWant || '',
    bio: user.bio || '',
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function updateSessionProfile(updates) {
  const session = getSession();
  if (!session) return null;

  const next = { ...session, ...updates };
  localStorage.setItem(SESSION_KEY, JSON.stringify(next));

  const users = getStoredUsers();
  const index = users.findIndex((u) => u.id === session.id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  return next;
}

export function getFavorites(userId) {
  try {
    const all = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || {};
    return all[userId] || [];
  } catch {
    return [];
  }
}

export function toggleFavorite(userId, skillId) {
  const all = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || {};
  const current = all[userId] || [];
  const exists = current.includes(skillId);
  all[userId] = exists
    ? current.filter((id) => id !== skillId)
    : [...current, skillId];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(all));
  return all[userId];
}

export function getMatches(userId) {
  try {
    const all = JSON.parse(localStorage.getItem(MATCHES_KEY)) || {};
    return all[userId] || [];
  } catch {
    return [];
  }
}

export function createMatchRequest(userId, skill, message, matchType) {
  const all = JSON.parse(localStorage.getItem(MATCHES_KEY)) || {};
  const current = all[userId] || [];
  const request = {
    id: `m-${Date.now()}`,
    skillId: skill.id,
    skillTitle: skill.title,
    skillOwner: skill.user,
    category: skill.category,
    matchType,
    message,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  all[userId] = [request, ...current];
  localStorage.setItem(MATCHES_KEY, JSON.stringify(all));
  return request;
}

export function updateMatchStatus(userId, matchId, status) {
  const all = JSON.parse(localStorage.getItem(MATCHES_KEY)) || {};
  const current = all[userId] || [];
  all[userId] = current.map((match) =>
    match.id === matchId ? { ...match, status } : match
  );
  localStorage.setItem(MATCHES_KEY, JSON.stringify(all));
  return all[userId];
}

export const CATEGORIES = [
  'All',
  'Technology',
  'Languages',
  'Music',
  'Arts',
  'Lifestyle',
  'Business',
];
