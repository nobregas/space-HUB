import type { OccupancyData, Reservation, Room, User, Event } from "@/types";

export const mockRooms: Room[] = [
  {
    id: "1",
    name: "Innovation Hub",
    capacity: 8,
    equipment: ['TV 55"', "Whiteboard", "Video Conference"],
    location: "1º Andar - Norte",
    image:
      "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=400",
    isAvailable: true,
  },
  {
    id: "2",
    name: "Creative Space",
    capacity: 12,
    equipment: ["Projetor 4K", "Som Surround", "Mesa Interativa"],
    location: "2º Andar - Sul",
    image:
      "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400",
    isAvailable: false,
  },
  {
    id: "3",
    name: "Focus Room",
    capacity: 4,
    equipment: ['Monitor 32"', "Webcam HD", "Telefone IP"],
    location: "1º Andar - Sul",
    image:
      "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=400",
    isAvailable: true,
  },
  {
    id: "4",
    name: "Brainstorm Lab",
    capacity: 6,
    equipment: ["Whiteboard Digital", "Flip Chart", "Tablets"],
    location: "2º Andar - Norte",
    image:
      "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400",
    isAvailable: true,
  },
];

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Ana Silva",
    email: "ana@example.com",
    company: "Tech Solutions Inc.",
    isActive: true,
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
    isCheckedIn: true,
    checkInTime: "09:30",
    skills: ["React", "TypeScript", "UX Design"],
    interests: ["Tecnologia", "Sustentabilidade", "Empreendedorismo"],
    role: "Frontend Developer",
  },
  {
    id: "2",
    name: "Carlos Mendes",
    email: "carlos@example.com",
    company: "Global Innovations Ltd.",
    isActive: true,
    avatar:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100",
    isCheckedIn: true,
    checkInTime: "08:45",
    skills: ["Python", "Machine Learning", "Data Science"],
    interests: ["IA", "Blockchain", "Investimentos"],
    role: "Data Scientist",
  },
  {
    id: "3",
    name: "Marina Costa",
    email: "marina@example.com",
    company: "Creative Minds Agency",
    isActive: false,
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
    isCheckedIn: false,
    skills: ["Marketing Digital", "SEO", "Content Strategy"],
    interests: ["Marketing", "Redes Sociais", "Fotografia"],
    role: "Marketing Manager",
  },
  {
    id: "4",
    name: "Pedro Almeida",
    email: "pedro@example.com",
    company: "Tech Solutions Inc.",
    isActive: true,
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
    isCheckedIn: false,
    skills: ["Java", "Spring Boot", "Cloud Computing"],
    interests: ["Desenvolvimento Backend", "DevOps", "Segurança"],
    role: "Backend Developer",
  },
  {
    id: "5",
    name: "Sofia Oliveira",
    email: "sofia@example.com",
    company: "Global Innovations Ltd.",
    isActive: true,
    avatar:
      "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100",
    isCheckedIn: true,
    checkInTime: "10:00",
    skills: ["Product Management", "Agile", "Scrum"],
    interests: ["Gestão de Projetos", "Inovação", "Liderança"],
    role: "Product Manager",
  },
];

export const mockReservations: Reservation[] = [
  {
    id: "1",
    roomId: "1",
    roomName: "Innovation Hub",
    userId: "1",
    userName: "Ana Silva",
    date: "2025-01-27",
    startTime: "10:00",
    endTime: "11:30",
    status: "confirmed",
    purpose: "Reunião de equipe",
    attendees: [mockUsers[0], mockUsers[1]],
  },
  {
    id: "2",
    roomId: "2",
    roomName: "Creative Space",
    userId: "2",
    userName: "Carlos Mendes",
    date: "2025-01-27",
    startTime: "14:00",
    endTime: "16:00",
    status: "confirmed",
    purpose: "Apresentação para cliente",
    attendees: [mockUsers[1], mockUsers[2]],
  },
];

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Workshop: React Avançado",
    description:
      "Aprenda técnicas avançadas de React incluindo hooks customizados, context API e performance optimization.",
    date: "2025-02-15",
    startTime: "14:00",
    endTime: "17:00",
    location: "Innovation Hub",
    organizer: "Ana Silva",
    attendees: 12,
    maxAttendees: 20,
    type: "workshop",
    image:
      "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "2",
    title: "Networking Friday",
    description:
      "Encontro descontraído para conectar profissionais de diferentes áreas e trocar experiências.",
    date: "2025-01-31",
    startTime: "18:00",
    endTime: "20:00",
    location: "Área Comum",
    organizer: "Space Hub",
    attendees: 25,
    maxAttendees: 40,
    type: "networking",
    image:
      "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "3",
    title: "Pitch Day: Startups Inovadoras",
    description:
      "Apresentações de startups em busca de investimento e feedback da comunidade.",
    date: "2025-02-08",
    startTime: "15:00",
    endTime: "18:00",
    location: "Creative Space",
    organizer: "Carlos Mendes",
    attendees: 8,
    maxAttendees: 15,
    type: "presentation",
    image:
      "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

export const mockOccupancyData: OccupancyData = {
  totalCapacity: 150,
  currentOccupancy: 73,
  availableRooms: 3,
  totalRooms: 4,
  hourlyOccupancy: [
    { hour: "08:00", count: 15 },
    { hour: "09:00", count: 35 },
    { hour: "10:00", count: 58 },
    { hour: "11:00", count: 73 },
    { hour: "12:00", count: 45 },
    { hour: "13:00", count: 28 },
    { hour: "14:00", count: 67 },
    { hour: "15:00", count: 82 },
    { hour: "16:00", count: 76 },
    { hour: "17:00", count: 54 },
    { hour: "18:00", count: 23 },
  ],
};
