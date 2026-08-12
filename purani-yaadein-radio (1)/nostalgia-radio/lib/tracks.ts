import type { Playlist, Track } from "./types";

/**
 * Every videoId below either came directly from you or is still blank.
 * I'm not sourcing any of these myself — these are commercial film songs,
 * so filling in an id here means you've confirmed it's the rights
 * holder's own embeddable upload, not me guessing off a search.
 *
 * To wire up a still-blank track: find the official upload (label
 * channel — T-Series, Saregama, Zee Music, Tips, Venus — or the film's
 * own channel), confirm embedding isn't disabled, and drop the
 * 11-character id from the watch URL in. One line each:
 *
 *   { id: "ddlj-1", title: "Tujhe Dekha To", artist: "...", film: "DDLJ",
 *     year: 1995, duration: 328, videoId: "cNV5hLSa9H8" }
 *
 * Tracks with an empty videoId render in the list as unavailable and are
 * skipped automatically during playback.
 */

const cassetteClassics: Track[] = [
  { id: "cc-1", title: "Dheere Dheere Se Meri Zindagi Mein Aana", artist: "Kumar Sanu, Anuradha Paudwal", film: "Aashiqui", year: 1990, duration: 330, videoId: "KeyfUuXPOcY" },
  { id: "cc-2", title: "Nazar Ke Samne", artist: "Kumar Sanu, Anuradha Paudwal", film: "Aashiqui", year: 1990, duration: 300, videoId: "Fw9au12q_1Y" },
  { id: "cc-3", title: "Main Duniya Bhula Dunga", artist: "Kumar Sanu", film: "Aashiqui", year: 1990, duration: 312, videoId: "" },
  { id: "cc-4", title: "Mera Dil Bhi Kitna Pagal Hai", artist: "Kumar Sanu, Sadhana Sargam", film: "Saajan", year: 1991, duration: 318, videoId: "58VwkROgWGI" },
  { id: "cc-5", title: "Bahut Pyar Karte Hain", artist: "Kumar Sanu", film: "Saajan", year: 1991, duration: 305, videoId: "3nzDp3eLYHY" },
  { id: "cc-6", title: "Dekha Hai Pehli Baar", artist: "Kumar Sanu, Sadhana Sargam", film: "Saajan", year: 1991, duration: 322, videoId: "FGUzNoJok_g" },
  { id: "cc-7", title: "Jeeye To Jeeye Kaise", artist: "Kumar Sanu", film: "Saajan", year: 1991, duration: 298, videoId: "wFYj1XpqlmE" },
  { id: "cc-8", title: "Ae Mere Humsafar", artist: "Kumar Sanu, Alka Yagnik", film: "Baazigar", year: 1993, duration: 315, videoId: "" },
  { id: "cc-9", title: "Jaadu Teri Nazar", artist: "Udit Narayan", film: "Darr", year: 1993, duration: 307, videoId: "" },
  { id: "cc-10", title: "Tu Mere Saamne", artist: "Lata Mangeshkar, S. P. Balasubrahmanyam", film: "Darr", year: 1993, duration: 320, videoId: "" },
  { id: "cc-11", title: "Pehla Nasha", artist: "Udit Narayan, Sadhana Sargam", film: "Jo Jeeta Wohi Sikandar", year: 1992, duration: 320, videoId: "LzXLcKbbDTw" },
  { id: "cc-12", title: "Tu Mile Dil Khile", artist: "Kumar Sanu, Alka Yagnik", film: "Criminal", year: 1995, duration: 300, videoId: "nqTS7ngviwQ" },
  { id: "cc-13", title: "Do Dil Mil Rahe Hain", artist: "Udit Narayan, Alka Yagnik", film: "Pardes", year: 1997, duration: 310, videoId: "eKIpHujNdX0" },
  { id: "cc-14", title: "Aankhon Se Tune Kya Keh Diya", artist: "Udit Narayan, Alka Yagnik", film: "Ghulam", year: 1998, duration: 305, videoId: "RlSRxyxFwXI" },
  { id: "cc-15", title: "Chand Chhupa Badal Mein", artist: "Udit Narayan, Alka Yagnik", film: "Hum Dil De Chuke Sanam", year: 1999, duration: 310, videoId: "ndlc50MADSY" },
];

const rainAndHeartbreak: Track[] = [
  { id: "rh-1", title: "Tip Tip Barsa Paani", artist: "Alka Yagnik, Udit Narayan", film: "Mohra", year: 1994, duration: 300, videoId: "" },
  { id: "rh-2", title: "Rim Jhim Rim Jhim", artist: "Kumar Sanu, Alka Yagnik", film: "1942: A Love Story", year: 1994, duration: 335, videoId: "" },
  { id: "rh-3", title: "Tujhe Dekha To", artist: "Lata Mangeshkar, Kumar Sanu", film: "Dilwale Dulhania Le Jayenge", year: 1995, duration: 328, videoId: "cNV5hLSa9H8" },
  { id: "rh-4", title: "Tu Hi Re", artist: "K. S. Chithra, Hariharan", film: "Bombay", year: 1995, duration: 340, videoId: "" },
  { id: "rh-5", title: "Satrangi Re", artist: "Sonu Nigam, Kavita Krishnamurthy", film: "Dil Se..", year: 1998, duration: 358, videoId: "" },
  { id: "rh-6", title: "Jiya Jale", artist: "Lata Mangeshkar, Sukhwinder Singh", film: "Dil Se..", year: 1998, duration: 312, videoId: "" },
  { id: "rh-7", title: "Tadap Tadap Ke", artist: "K. K.", film: "Hum Dil De Chuke Sanam", year: 1999, duration: 345, videoId: "" },
  { id: "rh-8", title: "Chupke Se", artist: "A. R. Rahman, Sadhana Sargam", film: "Saathiya", year: 2002, duration: 330, videoId: "" },
  { id: "rh-9", title: "Zara Zara", artist: "Bombay Jayashri", film: "Rehnaa Hai Terre Dil Mein", year: 2001, duration: 322, videoId: "a71xD6RyOok" },
  { id: "rh-10", title: "Sach Keh Raha Hai Deewana", artist: "Kunal Ganjawala, Shreya Ghoshal", film: "Rehnaa Hai Terre Dil Mein", year: 2001, duration: 300, videoId: "kp-Bqr1Gtyw" },
  { id: "rh-11", title: "Dil Ko Tumse Pyaar Hua", artist: "Udit Narayan, Alka Yagnik", film: "Rehnaa Hai Terre Dil Mein", year: 2001, duration: 315, videoId: "XcMy3lyDaQg" },
  { id: "rh-12", title: "Kaho Na Kaho", artist: "Shaan", film: "Murder", year: 2004, duration: 300, videoId: "S-z6vyR89Ig" },
];

const goldenEraAndIndipop: Track[] = [
  { id: "ge-1", title: "Koi Mil Gaya", artist: "Udit Narayan, Alka Yagnik", film: "Kuch Kuch Hota Hai", year: 1998, duration: 310, videoId: "Jzd4bma3QNo" },
  { id: "ge-2", title: "Kuch Kuch Hota Hai", artist: "Udit Narayan, Alka Yagnik", film: "Kuch Kuch Hota Hai", year: 1998, duration: 300, videoId: "bKZTnnFU9HA" },
  { id: "ge-3", title: "Tanhayee", artist: "Udit Narayan, Kailash Kher", film: "Dil Chahta Hai", year: 2001, duration: 316, videoId: "" },
  { id: "ge-4", title: "Koi Kahe Kehta Rahe", artist: "Shaan, Udit Narayan", film: "Dil Chahta Hai", year: 2001, duration: 295, videoId: "ctJI7pCbxAo" },
  { id: "ge-5", title: "Chand Sitare", artist: "Udit Narayan, Alka Yagnik", film: "Kaho Naa... Pyaar Hai", year: 2000, duration: 304, videoId: "" },
  { id: "ge-6", title: "Made in India", artist: "Alisha Chinai", film: "Non-film / Indipop", year: 1995, duration: 300, videoId: "IvloHsmi_vg" },
  { id: "ge-7", title: "Yaadein", artist: "Strings", film: "Non-film / Indipop", year: 2000, duration: 288, videoId: "" },
  { id: "ge-8", title: "Pal", artist: "K. K.", film: "Non-film / Indipop", year: 1999, duration: 292, videoId: "" },
  { id: "ge-9", title: "O Sanam", artist: "Lucky Ali", film: "Non-film / Indipop", year: 1996, duration: 305, videoId: "" },
  { id: "ge-10", title: "Yaad Piya Ki Aaye", artist: "Falguni Pathak", film: "Non-film / Indipop", year: 1999, duration: 280, videoId: "" },
  { id: "ge-11", title: "Ladki Badi Anjani Hai", artist: "Udit Narayan, Alka Yagnik", film: "Kuch Kuch Hota Hai", year: 1998, duration: 305, videoId: "WlWlGlvN4L4" },
  { id: "ge-12", title: "Saajanji Ghar Aaye", artist: "Sonu Nigam, Alka Yagnik", film: "Kuch Kuch Hota Hai", year: 1998, duration: 320, videoId: "8XtXLVylOoU" },
  { id: "ge-13", title: "Yeh Ladka Hai Deewana", artist: "Udit Narayan, Alka Yagnik", film: "Kuch Kuch Hota Hai", year: 1998, duration: 300, videoId: "F8jufkW0SP8" },
  { id: "ge-14", title: "Woh Ladki Hai Kahan", artist: "Shankar Mahadevan, Kavita Krishnamurthy", film: "Dil Chahta Hai", year: 2001, duration: 310, videoId: "sLva5MIY7ZY" },
  { id: "ge-15", title: "Kaho Naa Pyaar Hai", artist: "Udit Narayan, Alka Yagnik", film: "Kaho Naa... Pyaar Hai", year: 2000, duration: 300, videoId: "Mpzpqae6ID8" },
  { id: "ge-16", title: "Pyaar Ki Kashti Mein", artist: "Udit Narayan, Alka Yagnik", film: "Kaho Naa... Pyaar Hai", year: 2000, duration: 305, videoId: "t_oh_NkPtn0" },
  { id: "ge-17", title: "Aaja Mahiya", artist: "Sonu Nigam, Alka Yagnik", film: "Fiza", year: 2000, duration: 300, videoId: "wjhTdd-uywo" },
  { id: "ge-18", title: "Tu Fiza Hai", artist: "Udit Narayan", film: "Fiza", year: 2000, duration: 295, videoId: "50JRRPYIxbU" },
  { id: "ge-19", title: "Piya Basanti Re", artist: "Ustad Sultan Khan, K. S. Chithra", film: "Non-film / Indipop", year: 1996, duration: 300, videoId: "XFT2niDEy28" },
  { id: "ge-20", title: "Dooba Dooba", artist: "Mohit Chauhan / Silk Route", film: "Non-film / Indipop", year: 1998, duration: 300, videoId: "ecPMVO7JuTo" },
  { id: "ge-21", title: "Aankhon Mein Tera Hi Chehra", artist: "Aryans", film: "Non-film / Indipop", year: 2001, duration: 290, videoId: "V3vSJyHWFEw" },
];

export const playlists: Playlist[] = [
  { id: "cassette-classics", name: "Cassette Classics", tracks: cassetteClassics },
  { id: "rain-heartbreak", name: "Rain & Heartbreak", tracks: rainAndHeartbreak },
  { id: "golden-era-indipop", name: "Golden Era & Indipop", tracks: goldenEraAndIndipop },
];
