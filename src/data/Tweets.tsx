import { Icons } from "@/components/assets/Icons";

type TWEETS_TYPE = {
  id: number;
  author: string;
  handle: string;
  type: "twitter" | "blog";
  content: string;
  avatar: string;
}[];

export const TWEETS: TWEETS_TYPE = [
  {
    id: 1,
    author: "John Smith",
    handle: "@johnsmith",
    type: "blog",
    content:
      "Just reflecting on my journey today. It's fascinating how life takes us through different paths and experiences that shape who we are. I've learned that embracing every challenge and opportunity is crucial for personal growth. Remember, every setback is a setup for a comeback. Keep pushing forward, and never lose sight of your dreams!",
    avatar: "/carousel/1.jpg",
  },
  {
    id: 2,
    author: "Jane Doe",
    handle: "@janedoe",
    type: "twitter",
    content:
      "Taking a moment to appreciate the little things in life. Sometimes, we get so caught up in the hustle and bustle that we forget to stop and smell the roses. A cup of coffee, a good book, a walk in the park – these simple pleasures can bring so much joy and peace to our lives. Cherish every moment, big or small.",
    avatar: "/carousel/2.jpg",
  },
  {
    id: 3,
    author: "Bob Johnson",
    handle: "@bobjohnson",
    type: "twitter",
    content:
      "Spent the afternoon exploring the downtown area, and it was amazing! The vibrant street art, the eclectic mix of old and new architecture, and the diverse community make this city feel alive. If you haven't taken the time to explore your own city, I highly recommend it – you might be surprised by what you find!",
    avatar: "/carousel/3.jpg",
  },
  {
    id: 4,
    author: "Alice Brown",
    handle: "@alicebrown",
    type: "blog",

    content:
      "Just wrapped up a fantastic session with my team. It's incredible what a group of dedicated individuals can achieve when they come together with a shared vision. Teamwork truly makes the dream work! Grateful for such an inspiring and hardworking group of people. Onwards and upwards!",
    avatar: "/carousel/2.jpg",
  },
  {
    id: 5,
    author: "Charlie Davis",
    handle: "@charliedavis",
    type: "twitter",
    content:
      "Feeling incredibly inspired after today's conference on innovation and technology. The speakers were phenomenal, and I learned so much about the future of artificial intelligence and its potential impact on various industries. Excited to take these insights back to the office and start brainstorming some new ideas!",
    avatar: "/carousel/3.jpg",
  },
  {
    id: 6,
    author: "Charlie Davis",
    handle: "@charliedavis",
    type: "twitter",
    content:
      "What a week! Juggling multiple projects, attending meetings, and finding time for personal development – it's been hectic, but also incredibly rewarding. I'm reminded once again of the importance of time management and self-care. Remember to take breaks and recharge your batteries. Your mental health matters just as much as your productivity!",
    avatar: "/carousel/3.jpg",
  },
  {
    id: 7,
    author: "Charlie Davis",
    handle: "@charliedavis",
    type: "blog",

    content:
      "Just got back from a thrilling weekend getaway in the mountains. The fresh air, stunning views, and the peace of being surrounded by nature were exactly what I needed to recharge. Sometimes, stepping away from the daily grind is necessary to gain a fresh perspective. Already planning my next adventure!",
    avatar: "/carousel/3.jpg",
  },
  {
    id: 8,
    author: "Charlie Davis",
    handle: "@charliedavis",
    type: "twitter",
    content:
      "I've been thinking a lot about personal growth lately. It's amazing how much you can achieve when you step out of your comfort zone. Challenge yourself, take risks, and don't be afraid to fail. Failure is just a stepping stone on the path to success. Keep moving forward, and don't look back!",
    avatar: "/carousel/3.jpg",
  },
  {
    id: 9,
    author: "Charlie Davis",
    handle: "@charliedavis",
    type: "twitter",
    content:
      "Had a wonderful experience volunteering at the local shelter today. It's truly heartwarming to see the positive impact we can have on our communities. Giving back is one of the most fulfilling things you can do. If you have the chance, get involved and make a difference. Every little bit helps!",
    avatar: "/carousel/3.jpg",
  },
  {
    id: 10,
    author: "Charlie Davis",
    handle: "@charliedavis",
    type: "blog",

    content:
      "Just wrapped up another productive week. Balancing work, family, and personal projects can be challenging, but I wouldn't have it any other way. Stay focused, stay positive, and keep pushing yourself to new heights. The journey may be tough, but the destination is worth it. Keep striving for excellence!",
    avatar: "/carousel/3.jpg",
  },
];
