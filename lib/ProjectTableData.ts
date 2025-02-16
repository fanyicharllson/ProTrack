interface Projects {
    date: string;
    budget: string;
    projectName: string;
    prolanguage: string;
    type: string;
    // projectIcon?: string;
  }
  
export const projects: Projects[] = [
    {
      date: '25 Jul 12:30',
      budget: '- $10',
      projectName: 'YouTube Clone',
      prolanguage: 'React',
      type: 'Web app',
      // projectIcon: '/icons/youtube.png',
    },
    {
      date: '26 Jul 15:00',
      budget: '- $150',
      projectName: 'ProTrack',
      prolanguage: 'Next Js',
      type: 'Mobile app',
      // projectIcon: '/icons/reserved.png',
    },
    {
      date: '27 Jul 9:00',
      budget: '- $80',
      projectName: 'Smart Chart',
      prolanguage: 'PHP',
      type: 'Cafe & Restaurants',
      // projectIcon: '/icons/yaposhka.png',
    },
  ];
  