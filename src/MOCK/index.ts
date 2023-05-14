export interface MOCK_DATA_DOCTOR_MODEL {
  name: string;
  email: string;
  mobile: string;
  experience: string;
  certifications: string;
  category: string;
  location: string;
  openingHours: string;
  about: string;
  image: string;
  locationPoint: {latitude: number; longitude: number};
}

export const MOCK_DATA_DOCTOR_ONE: MOCK_DATA_DOCTOR_MODEL[] = [
  {
    name: 'Dr. Lee',
    email: 'drlee@ca.com',
    mobile: '42714456',
    experience: '15 years',
    certifications: '10',
    category: 'General Practitioner',
    location: 'Kowloon Bay',
    openingHours: '11:0 AM - 18:00 PM',
    about: 'Good Doctor',
    image:
      'https://st.focusedcollection.com/13422768/i/1800/focused_167534016-stock-photo-male-doctor-smiling-looking-camera.jpg',
    locationPoint: {
      latitude: 22.319764,
      longitude: 114.22664,
    },
  },
];

export const MOCK_DATA_DOCTOR: MOCK_DATA_DOCTOR_MODEL[] = [
  {
    name: 'Dr. Johnson',
    email: 'drjohnson@ca.com',
    mobile: '65432178',
    experience: '20 years',
    certifications: '15',
    category: 'Internal Medicine Physician',
    location: 'Sha Tin',
    openingHours: '9:00 AM - 5:00 PM',
    about: 'Excellent Doctor',
    image: 'https://img.freepik.com/premium-photo/beautiful-doctor-pointing-fingers_1258-16474.jpg',
    locationPoint: {
      latitude: 22.377817,
      longitude: 114.180615,
    },
  },
  {
    name: 'Dr. Cheung',
    email: 'drcheung@ca.com',
    mobile: '65314287',
    experience: '9 years',
    certifications: '6',
    category: 'Ophthalmologist',
    location: 'Sha Tin',
    openingHours: '10:00 AM - 6:00 PM',
    about:
      'I have been working as an ophthalmologist for 9 years, and have experience in treating various eye diseases.',
    image: 'https://img.freepik.com/free-photo/portrait-hansome-young-male-doctor-man_171337-5068.jpg',
    locationPoint: {
      latitude: 22.392837,
      longitude: 114.203459,
    },
  },
  {
    name: 'Dr. Yip',
    email: 'dryip@ca.com',
    mobile: '65182374',
    experience: '18 years',
    certifications: '12',
    category: 'Otolaryngologist',
    location: 'Mong Kok',
    openingHours: '9:00 AM - 8:00 PM',
    about:
      'I am an experienced otolaryngologist with more than 18 years of experience in treating ear, nose, and throat problems.',
    image: 'https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg',
    locationPoint: {
      latitude: 22.322807,
      longitude: 114.168134,
    },
  },
  {
    name: 'Dr. Lau',
    email: 'drlau@ca.com',
    mobile: '68972341',
    experience: '10 years',
    certifications: '7',
    category: 'General Practitioner',
    location: 'Yuen Long',
    openingHours: '10:00 AM - 6:00 PM',
    about:
      'I am a general practitioner with 10 years of experience in treating all kinds of common health problems.',
    image: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg',
    locationPoint: {
      latitude: 22.444372,
      longitude: 114.031167,
    },
  },
  {
    name: 'Dr. Tse',
    email: 'drtse@ca.com',
    mobile: '61234598',
    experience: '25 years',
    certifications: '18',
    category: 'General Surgeon',
    location: 'Central',
    openingHours: '8:00 AM - 4:00 PM',
    about:
      'I am an experienced general surgeon with 25 years of experience in performing various surgeries.',
    image: 'https://st4.depositphotos.com/3207359/27281/i/600/depositphotos_272816440-stock-photo-male-doctor-with-stethoscope-standing.jpg',
    locationPoint: {
      latitude: 22.282357,
      longitude: 114.158392,
    },
  },
  {
    name: 'Dr. Cheng',
    email: 'drcheng@ca.com',
    mobile: '61729384',
    experience: '12 years',
    certifications: '9',
    category: 'Dermatologists',
    location: 'Causeway Bay',
    openingHours: '11:00 AM - 7:00 PM',
    about:
      'I am a dermatologist with 12 years of experience in diagnosing and treating skin diseases.',
    image: 'https://st2.depositphotos.com/4153545/7978/i/950/depositphotos_79783226-stock-photo-cheerful-indian-female-doctor.jpg',
    locationPoint: {
      latitude: 22.279684,
      longitude: 114.184982,
    },
  },
  {
    name: 'Dr. Tam',
    email: 'drtam@ca.com',
    mobile: '63719482',
    experience: '20 years',
    certifications: '15',
    category: 'Psychologist',
    location: 'Tsuen Wan',
    openingHours: '9:00 AM - 6:00 PM',
    about:
      'I am a psychologist with 20 years of experience in providing counseling and psychotherapy services.',
    image: 'https://watermark.lovepik.com/photo/20211210/large/lovepik-middle-aged-doctor-holding-a-love-model-picture_501777255.jpg',
    locationPoint: {
      latitude: 22.369112,
      longitude: 114.115361,
    },
  },
  {
    name: 'Dr. Choi',
    email: 'drchoi@ca.com',
    mobile: '62483971',
    experience: '8 years',
    certifications: '5',
    category: 'Ophthalmologist',
    location: 'Tsim Sha Tsui',
    openingHours: '10:00 AM - 8:00 PM',
    about:
      'I am an ophthalmologist with 8 years of experience in diagnosing and treating eye diseases.',
    image: 'https://media.gettyimages.com/id/1307155493/photo/confident-mixed-race-doctor-with-arms-crossed-against-white-background.jpg?s=612x612&w=gi&k=20&c=-6MWZLLkaGJi2xNIM85yGdGZFvaq9lb2v0N85pjtp5E=',
    locationPoint: {
      latitude: 22.297964,
      longitude: 114.174263,
    },
  },
  {
    name: 'Dr. Wong',
    email: 'drwong@ca.com',
    mobile: '63598124',
    experience: '15 years',
    certifications: '10',
    category: 'Orthopedic Surgeon',
    location: 'Tai Po',
    openingHours: '9:00 AM - 5:00 PM',
    about:
      'I am an orthopedic surgeon with 15 years of experience in treating bone and joint problems.',
    image: 'https://img.freepik.com/free-photo/portrait-asian-doctor-woman-cross-arms-standing-medical-uniform-stethoscope-smiling-cam_1258-83844.jpg',
    locationPoint: {
      latitude: 22.44703,
      longitude: 114.171217,
    },
  },
  {
    name: 'Dr. Ng',
    email: 'drng@ca.com',
    mobile: '64581237',
    experience: '11 years',
    certifications: '8',
    category: 'Internal Medicine Physician',
    location: 'Sha Tin',
    openingHours: '9:00 AM - 5:00 PM',
    about:
      'I am an internal medicine physician with 11 years of experience in treating patients with various health issues.',
    image: 'https://img.freepik.com/free-photo/portrait-asian-doctor-woman-cross-arms-standing-medical-uniform-stethoscope-smiling-cam_1258-83844.jpg',
    locationPoint: {
      latitude: 22.377902,
      longitude: 114.182305,
    },
  },

  {
    name: 'Dr. Au',
    email: 'drau@ca.com',
    mobile: '60384921',
    experience: '17 years',
    certifications: '12',
    category: 'Psychologist',
    location: 'Mong Kok',
    openingHours: '11:00 AM - 8:00 PM',
    about:
      'I am a psychologist with 17 years of experience in treating patients with different mental health issues.',
    image: 'https://img.freepik.com/free-photo/portrait-asian-doctor-woman-cross-arms-standing-medical-uniform-stethoscope-smiling-cam_1258-83844.jpg',
    locationPoint: {
      latitude: 22.319452,
      longitude: 114.170662,
    },
  },

  {
    name: 'Dr. Cheung',
    email: 'drcheung@ca.com',
    mobile: '61829374',
    experience: '14 years',
    certifications: '10',
    category: 'Dermatologists',
    location: 'Tsuen Wan',
    openingHours: '10:00 AM - 6:00 PM',
    about:
      'I am a dermatologist with 14 years of experience in diagnosing and treating a wide range of skin diseases.',
    image: 'https://img.freepik.com/free-photo/portrait-asian-doctor-woman-cross-arms-standing-medical-uniform-stethoscope-smiling-cam_1258-83844.jpg',
    locationPoint: {
      latitude: 22.371319,
      longitude: 114.117495,
    },
  },

  {
    name: 'Dr. Tse',
    email: 'drtse2@ca.com',
    mobile: '65184723',
    experience: '7 years',
    certifications: '5',
    category: 'General Surgeon',
    location: 'Central',
    openingHours: '9:00 AM - 6:00 PM',
    about:
      'I am a general surgeon with 7 years of experience in performing various types of surgical procedures.',
    image: 'https://img.freepik.com/free-photo/portrait-asian-doctor-woman-cross-arms-standing-medical-uniform-stethoscope-smiling-cam_1258-83844.jpg',
    locationPoint: {
      latitude: 22.281714,
      longitude: 114.159513,
    },
  },
  {
    name: 'Dr. Kim',
    email: 'drkim@hk.com',
    mobile: '33101071',
    experience: '18 years',
    certifications: '9',
    category: 'Ophthalmologist',
    location: 'Kowloon Bay',
    openingHours: '9:00 AM - 17:00 PM',
    about: 'Dedicated to eye care',
    image: 'https://img.freepik.com/free-photo/portrait-asian-doctor-woman-cross-arms-standing-medical-uniform-stethoscope-smiling-cam_1258-83844.jpg',
    locationPoint: {
      latitude: 22.323264,
      longitude: 114.209363,
    },
  },
  {
    name: 'Dr. Smith',
    email: 'drsmith@hk.com',
    mobile: '13391333',
    experience: '25 years',
    certifications: '12',
    category: 'General Practitioner',
    location: 'Sai Ying Pun',
    openingHours: '10:00 AM - 18:00 PM',
    about: 'Experienced and caring doctor',
    image: 'https://img.freepik.com/free-photo/portrait-asian-doctor-woman-cross-arms-standing-medical-uniform-stethoscope-smiling-cam_1258-83844.jpg',
    locationPoint: {
      latitude: 22.289447,
      longitude: 114.139382,
    },
  },
  {
    name: 'Dr. Garcia',
    email: 'drgarcia@hk.com',
    mobile: '68823920',
    experience: '10 years',
    certifications: '5',
    category: 'Orthopedic Surgeon',
    location: 'Central',
    openingHours: '8:00 AM - 16:00 PM',
    about: 'Expert in bone and joint care',
    image: 'https://img.freepik.com/free-photo/portrait-asian-doctor-woman-cross-arms-standing-medical-uniform-stethoscope-smiling-cam_1258-83844.jpg',
    locationPoint: {
      latitude: 22.278029,
      longitude: 114.160887,
    },
  },

  {
    name: 'Dr. Lee',
    email: 'drlee@hk.com',
    mobile: '92222272',
    experience: '12 years',
    certifications: '7',
    category: 'Psychologist',
    location: 'Kwun Tong',
    openingHours: '11:00 AM - 19:00 PM',
    about: 'Empathetic and compassionate therapist',
    image: 'https://img.freepik.com/free-photo/portrait-asian-doctor-woman-cross-arms-standing-medical-uniform-stethoscope-smiling-cam_1258-83844.jpg',
    locationPoint: {
      latitude: 22.3225,
      longitude: 114.219215,
    },
  },
  {
    name: 'Dr. Hernandez',
    email: 'drhernandez@hk.com',
    mobile: '81124588',
    experience: '15 years',
    certifications: '8',
    category: 'Otolaryngologist',
    location: 'Central',
    openingHours: '9:30 AM - 17:30 PM',
    about: 'Specializes in ear, nose and throat issues',
    image: 'https://img.freepik.com/free-photo/portrait-asian-doctor-woman-cross-arms-standing-medical-uniform-stethoscope-smiling-cam_1258-83844.jpg',
    locationPoint: {
      latitude: 22.280328,
      longitude: 114.157898,
    },
  },
  {
    name: 'Dr. Chan',
    email: 'drchan@hk.com',
    mobile: '77712233',
    experience: '22 years',
    certifications: '18',
    category: 'General Surgeon',
    location: 'Kowloon Bay',
    openingHours: '8:30 AM - 16:30 PM',
    about: 'Skilled in handling surgical procedures',
    image: 'https://img.freepik.com/free-photo/portrait-asian-doctor-woman-cross-arms-standing-medical-uniform-stethoscope-smiling-cam_1258-83844.jpg',
    locationPoint: {
      latitude: 22.327812,
      longitude: 114.213594,
    },
  },
  {
    name: 'Dr. Wong',
    email: 'drwong@hk.com',
    mobile: '68920020',
    experience: '27 years',
    certifications: '16',
    category: 'Internal Medicine Physician',
    location: 'Sai Ying Pun',
    openingHours: '10:00 AM - 18:00 PM',
    about: 'Expert in diagnosing and treating internal diseases',
    image: 'https://img.freepik.com/free-photo/portrait-asian-doctor-woman-cross-arms-standing-medical-uniform-stethoscope-smiling-cam_1258-83844.jpg',
    locationPoint: {
      latitude: 22.28652,
      longitude: 114.145377,
    },
  },
];
