export const pages = {
  home: {
    seoDetails: {
      keywords: [
        'Robotics',
        'IoT',
        'Consultancy',
        'Technology',
        'Innovation',
        'Design',
        'Cutting-edge Solutions',
        'Robotics Education',
        'Personalized Tutoring',
        'Hands-on Learning',
        'Comprehensive Curriculum',
        'Innovation',
        'Problem-solving Skills',
        'Accessibility',
        'Innovation',
        'robotutortech',
        'robotutor tech',
        'robo tutor tech',
        'Robotutor tech'],
      description: 'Robotutor Tech - Empowering Innovation in Robotics and IoT. We are a consultancy dedicated to helping businesses thrive in the digital age. Our expertise in strategy, design, and software engineering brings cutting-edge technology solutions to your doorstep. Let\'s innovate together!',
      title: '',
      metaImage: ''
    },
    contents: [
      {
        widget: 'HeroBanner',
        data: {
          title: 'Unlock your \'Innovation Spirit\'',
          bg: 'image',
          color: 'skyblue',
          titleColor: 'light',
          size: 'large',
          image: {
            src: '/img/banner/banner-1.webp',
            alt: 'what-we-do'
          }
        }
      },
      {
        widget: 'TextContent',
        styles: {width: 'Center'},
        data: {
          content: `<h2>Welcome to Robotutor Tech - Your Partner in Robotics and Industrial Automation</h2>
                              <p>At Robotutor Tech, we are dedicated to bringing the world of robotics and industrial automation to your fingertips. Whether you're a student eager to learn or a business looking to innovate, we have the tools, expertise, and passion to help you succeed.</p>`
        }
      },
      {
        widget: 'ContentCards',
        data: {
          title: 'Our Services',
          cards: [
            {
              title: 'Robotics Tutoring',
              image: {src: '/img/personalized-learnings.webp', alt: 'Tutoring'},
              content: 'Our personalized tutoring sessions bring robotics education right to your doorstep. Our experienced tutors will guide you through hands-on learning experiences, making robotics fun and accessible for all ages.'
            },
            {
              title: 'Industrial Automation Consultancy',
              image: {src: '/img/industrial-automation.webp', alt: ''},
              content: 'For businesses seeking to streamline their operations and increase efficiency, our consultancy services offer tailor-made solutions using the latest automation technologieConsultancys.'
            }
          ]
        }
      },
      {
        widget: 'ContentCards',
        data: {
          title: 'Why Choose Robotutor Tech?',
          cards: [
            {
              title: 'Experience',
              image: {src: '/img/experienced-tutor.webp', alt: 'Experience'},
              content: 'With years of experience in robotics and industrial automation, we have the knowledge and expertise to help you achieve your goals.'
            },
            {
              title: 'Innovation',
              image: {src: '/img/innovations.webp', alt: 'Innovation'},
              content: 'We are constantly exploring new technologies and techniques to ensure that our services are at the forefront of innovation.'
            },
            {
              title: 'Passion',
              image: {src: '/img/passion.webp', alt: 'Passion'},
              content: 'Robotics is more than just a job for us - it\'s our passion. We are dedicated to inspiring the next generation of innovators and problem-solvers.'
            }
          ]
        }
      },
      {
        widget: 'TextContent',
        styles: {width: 'Center'},
        data: {
          content: `<h2>Get Started Today</h2>
                              <p>Whether you're a student looking to explore the exciting world of robotics or a business seeking to automate your processes, Robotutor Tech is here to help. Contact us today to learn more about our services and how we can help you succeed.</p>`
        }
      },
      {
        widget: 'TextWithCTA',
        data: {link: '/contact-us', ctaText: 'Get in touch', text: 'Transform your robotics journey'}
      }
    ]
  },
  'what-we-do': {
    seoDetails: {
      keywords: [],
      title: 'What we do',
      description: '',
      metaImage: ''
    },
    contents: [
      {
        widget: 'HeroBanner',
        data: {
          title: 'What we do',
          bg: 'color',
          color: 'skyblue',
          image: {
            src: 'https://www.robotutortech.com/wp-content/themes/boostup-business/assets/images/inner-banner.webp',
            alt: 'what-we-do'
          }
        }
      },
      {
        widget: 'TextContent',
        styles: {width: 'Center'},
        data: {
          content: `<h2>For education</h2>
                              <p>At Robotutor Tech, we are dedicated to bringing the world of robotics education to your doorstep. Our mission is to inspire and empower students of all ages to explore the fascinating realm of robotics in the comfort of their homes. Whether you’re a beginner eager to grasp the basics or an enthusiast aiming to master advanced concepts, our dedicated team of tutors is here to guide you on your robotics journey.</p>
                              <p>We envision a future where every individual has the opportunity to unlock their potential in robotics. We believe in making this cutting-edge field accessible to all, fostering a passion for innovation and problem-solving from the comfort of one’s own home.</p>
                              <h2>For industry</h2>
                              <p>At Robotutor Tech, we are a premier robotics and IoT consultancy company dedicated to helping businesses harness the power of cutting-edge technology. With a focus on strategy, design, and software engineering, we enable enterprises and technology disruptor's worldwide to thrive in the digital age.</p>
                              <p>In a world where digital disruption is constant, our team at Robotutor Tech stands ready to assist. As a startup diving into the exciting world of robotics and IoT consultancy with a fresh perspective, we are fueled by passion, innovation, and a drive to make a difference. While we may be new to the scene, we offer expertise in improving our clients’ responsiveness to change, unlocking new value through data and AI, building adaptable technology platforms aligned with business strategies, and delivering exceptional digital products and experiences at scale.</p>
                              <p>Partner with us at Robotutor Tech to navigate the complexities of the modern technological landscape and achieve success in the digital era.</p>`
        }
      },
      {
        widget: 'TextWithCTA',
        data: {
          text: 'Want to talk to us about your robotics journey?',
          link: '/contact-us',
          ctaText: 'Contact us'
        }
      }
    ]
  },
  articles: {

    seoDetails: {
      keywords: [],
      title: 'Articles',
      description: '',
      metaImage: ''
    },
    contents: [
      {
        widget: 'HeroBanner',
        data: {
          title: 'Articles',
          bg: 'color',
          color: 'skyblue',
          image: {
            src: 'https://www.robotutortech.com/wp-content/themes/boostup-business/assets/images/inner-banner.webp',
            alt: 'what-we-do'
          }
        }
      }
    ]
  },
  blogs: {

    seoDetails: {
      keywords: [],
      title: 'Blogs',
      description: '',
      metaImage: ''
    },
    contents: [
      {
        widget: 'HeroBanner',
        data: {
          title: 'Blogs',
          bg: 'color',
          color: 'skyblue',
          image: {
            src: 'https://www.robotutortech.com/wp-content/themes/boostup-business/assets/images/inner-banner.webp',
            alt: 'what-we-do'
          }
        }
      }
    ]
  },
  'about-us': {
    seoDetails: {
      title: 'About us',
      keywords: [],
      description: '',
      metaImage: ''
    },
    contents: [
      {
        widget: 'HeroBanner',
        data: {
          title: 'About us',
          bg: 'color',
          color: 'skyblue',
          image: {
            src: 'https://www.robotutortech.com/wp-content/themes/boostup-business/assets/images/inner-banner.webp',
            alt: 'what-we-do'
          }
        }
      },
      {
        widget: 'TextContent',
        styles: {width: 'Center'},
        data: {
          content: `<p>At Robotutor Tech, we are passionate about robotics and education. Founded with the vision of making robotics accessible to all, we offer personalized tutoring sessions and consultancy services in the fields of robotics and industrial automation.</p>
                              <h2>Our Mission</h2>
                              <p>Our mission is to foster innovation and problem-solving skills by bringing robotics education to students' homes. We believe that hands-on learning is the key to unlocking creativity and preparing the next generation for the challenges of tomorrow.</p>`
        }
      },
      {
        widget: 'ContentCards',
        data: {
          title: 'Why Choose Us?',
          cards: [
            {
              title: 'Experienced Tutors',
              image: {src: '/img/experienced-tutor.webp', alt: 'Experienced Tutors'},
              content: 'Our tutors are experts in their field, with years of experience in robotics and industrial automation.'
            },
            {
              title: 'Personalized Learning',
              image: {src: '/img/personalized-learnings.webp', alt: 'Personalized Learning'},
              content: 'We tailor our tutoring sessions to meet the unique needs of each student, ensuring that they get the most out of their experience.'
            },
            {
              title: 'Comprehensive Curriculum',
              image: {src: '/img/comprehensive-curriculum.webp', alt: 'Comprehensive Curriculum'},
              content: 'Our curriculum covers a wide range of topics, from basic robotics principles to advanced industrial automation techniques.'
            },
            {
              title: 'Flexible Scheduling',
              image: {src: '/img/flexible-schedule.webp', alt: 'Flexible Scheduling'},
              content: 'We understand that every student has different scheduling needs, which is why we offer flexible tutoring sessions to fit your schedule.'
            }
          ]
        }
      },
      {
        widget: 'TextContent',
        styles: {width: 'Center'},
        data: {
          content: `<h2>Get in Touch</h2>
                              <p>Whether you're a student looking to explore the world of robotics or a business seeking to implement automation solutions, Robotutor Tech is here to help. Contact us today to learn more about our services and how we can help you achieve your goals.</p>`
        }
      },
      {
        widget: 'TextWithCTA',
        data: {
          text: 'Want to talk to us about your robotics journey?',
          link: '/contact-us',
          ctaText: 'Contact us'
        }
      }
    ]
  },
  'contact-us': {
    seoDetails: {
      keywords: [],
      title: 'Contact us',
      description: '',
      metaImage: ''
    },
    contents: [
      {
        widget: 'HeroBanner',
        data: {
          title: 'Contact us',
          bg: 'color',
          color: 'skyblue',
          image: {
            src: 'https://www.robotutortech.com/wp-content/themes/boostup-business/assets/images/inner-banner.webp',
            alt: 'what-we-do'
          }
        }
      },
      {
        widget: 'ContactUs',
        data: {
          title: 'Contact us',
          location: {
            companyName: 'Robotutor tech pvt ltd',
            address1: 'Flat no. 104, Luck apartment',
            address2: 'Blunt square, Durgapuri',
            address3: 'Lucknow, Uttar Pradesh',
            address4: 'India - 226004',
            phone: '+91 9560773418',
            email: 'contact@robotutortech.com',
            map: 'https://maps.app.goo.gl/ZgM9Jw6oSpUg7UWe6'
          }
        }
      }
    ]
  },
  partnerships: {
    seoDetails: {
      keywords: [],
      title: 'Partnerships',
      description: '',
      metaImage: ''
    },
    contents: [
      {
        widget: 'HeroBanner',
        data: {
          title: 'Partnerships',
          bg: 'color',
          color: 'skyblue',
          image: {
            src: 'https://www.robotutortech.com/wp-content/themes/boostup-business/assets/images/inner-banner.webp',
            alt: 'what-we-do'
          }
        }
      }
    ]
  },
  'privacy-policy': {
    seoDetails: {
      keywords: [],
      title: 'Privacy policy',
      description: '',
      metaImage: ''
    },
    contents: [
      {
        widget: 'HeroBanner',
        data: {
          title: 'Privacy policy',
          bg: 'color',
          color: 'skyblue',
          image: {
            src: 'https://www.robotutortech.com/wp-content/themes/boostup-business/assets/images/inner-banner.webp',
            alt: 'what-we-do'
          }
        }
      },
      {
        widget: 'TextContent',
        styles: {width: 'Center'},
        data: {
          content: `<div>
             <a href="/training-privacy-policy" target="_blank">Training at Robotutor tech privacy policy.</a>
             <p>This Privacy Policy explains how Robotutor Tech ("we", "us", or "our") collects, uses, and discloses information about you when you access or use our website or services.</p>
            <h2>Information We Collect</h2>
            <p>We may collect certain personal information about you when you use our website or services. This information may include:</p>
            <ul>
            <li><strong>Contact Information</strong>: such as your name, email address, phone number, and mailing address.</li>
            <li><strong>Demographic Information</strong>: such as your age, gender, and location.</li>
            <li><strong>Payment Information</strong>: such as your credit card details or other payment information.</li>
            <li><strong>Usage Information</strong>: such as your IP address, browser type, operating system, and device information.</li>
            <li><strong>Other Information</strong>: any other information you choose to provide to us.</li>
            </ul>
            <h2>How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including:</p>
            <ul>
            <li>Providing and managing our services to you.</li>
            <li>Communicating with you about our services and promotions.</li>
            <li>Improving our website and services.</li>
            <li>Personalizing your experience on our website.</li>
            <li>Analyzing trends and statistics.</li>
            </ul>
            
            <h2>Information Sharing</h2>
            <p>We may share your information with third parties for the following purposes:</p>
            <ul>
            <li><strong>Service Providers</strong>: we may share your information with third-party service providers who help us provide our services to you.</li>
            <li><strong>Legal Requirements</strong>: we may disclose your information in response to a subpoena, court order, or other legal process.</li>
            <li><strong>Protection of Rights</strong>: we may disclose your information to protect and defend our rights or property.</li>
            </ul>
            
            <h2>Data Retention</h2>
            <p>We will retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy unless a longer retention period is required or permitted by law.</p>
            
            <h2>Your Choices</h2>
            <p>You may choose not to provide certain personal information, but this may limit your ability to use our services or access certain features of our website.</p>
            
            <h2>Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
            
            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:contact@robotutortech.com">contact@robotutortech.com.</a></p>
            </div>`
        }
      }
    ]
  },
  'code-of-conduct': {
    seoDetails: {
      keywords: [],
      title: 'Code of conduct',
      description: '',
      metaImage: ''
    },
    contents:
      [
        {
          widget: 'HeroBanner',
          data: {
            title: 'Code of conduct',
            bg: 'color',
            color: 'skyblue',
            image: {
              src: 'https://www.robotutortech.com/wp-content/themes/boostup-business/assets/images/inner-banner.webp',
              alt: 'what-we-do'
            }
          }
        }
      ]
  },
  error: {
    seoDetails: {
      keywords: [],
      title: '',
      description: '',
      metaImage: ''
    },

    contents: [
      {
        widget: 'TextContent',
        styles: {width: 'Center'},
        data: {
          content: `<h1>Page not found</h1>
                             <p>Oops! It seems like the page you were trying to find isn't around anymore (or at least isn't here).</p>
                             <h2>What next?</h2>
                             <p>Try checking the URL for errors, or hit the back button on your browser.</p>
                             <p>Go to <a href="/">Homepage</a></p>`
        }
      }
    ]
  },
  courses: {
    seoDetails: {
      keywords: [],
      title: 'Courses',
      description: '',
      metaImage: ''
    },

    contents: [
      {
        widget: 'HeroBanner',
        data: {
          title: 'Courses',
          bg: 'image',
          color: 'skyblue',
          titleColor: 'light',
          size: 'large',
          image: {
            src: '/img/banner/robotic-hand.webp',
            alt: 'what-we-do'
          }
        }
      },
      {
        widget: 'TextContent',
        styles: {width: 'Center'},
        data: {
          content: `<h2>Embedded system (Robotics)</h2>
                    <h3>30 Days (30 projects)</h3>
                    <ul style="margin-left:30px">
                        <li>Basic electronics</li>
                        <li>Power supply</li>
                        <li>Analog circuits</li>
                        <li>PCB Designing</li>
                        <li>C Programming</li>
                        <li>Arduino</li>
                        <li>Motor (DC motor, Servo motor, Stepper motor)</li>
                        <li>Relay (Electromagnetic switch)</li>
                        <li>7 segment display</li>
                        <li>LCD (Liquid Crystal Display)</li>
                        <li>Dot matrix</li>
                        <li>Ultrasonic</li>
                        <li>RF Communication & Identification</li>
                        <li>Serial communication</li>
                        <li>GSM & GPS</li>
                    </ul>
                    <br/>
                    <h2>Internet of things (IOT)</h2>
                    <h3>45 Days (45 projects)</h3>
                    <h4 style="font-weight:500">All topics of Embedded system</h4>
                    <ul style="margin-left:30px">
                        <li>Basic electronics</li>
                        <li>Power supply</li>
                        <li>Analog circuits</li>
                        <li>PCB Designing</li>
                        <li>C Programming</li>
                        <li>Arduino</li>
                        <li>Motor (DC motor, Servo motor, Stepper motor)</li>
                        <li>Relay (Electromagnetic switch)</li>
                        <li>7 segment display</li>
                        <li>LCD (Liquid Crystal Display)</li>
                        <li>Dot matrix</li>
                        <li>Ultrasonic</li>
                        <li>RF Communication & Identification</li>
                        <li>Serial communication</li>
                        <li>GSM & GPS</li>
                    </ul>`
        }
      },
      {
        widget: 'TextWithCTA',
        data: {
          text: 'Unlock your \'Innovation spirit\'',
          link: '/register',
          ctaText: 'Register now'
        }
      }
    ]
  },
  register: {
    seoDetails: {
      keywords: [],
      title: 'Register',
      description: '',
      metaImage: ''
    },
    contents: [
      {
        widget: 'HeroBanner',
        data: {
          title: 'Register',
          bg: 'image',
          color: 'skyblue',
          titleColor: 'light',
          size: 'large',
          image: {
            src: '/img/banner/banner-1.webp',
            alt: 'what-we-do'
          }
        }
      },
      {
        widget: 'RegistrationForm',
        data: {}
      }
    ]
  },
  'training-privacy-policy': {
    seoDetails: {
      keywords: [],
      title: 'Privacy policy',
      description: '',
      metaImage: ''
    },
    contents: [
      {
        widget: 'HeroBanner',
        data: {
          title: 'Privacy policy',
          bg: 'color',
          color: 'skyblue',
          image: {
            src: '/img/banner/banner-1.webp',
            alt: 'what-we-do'
          }
        }
      },
      {
        widget: 'TextContent',
        styles: {width: 'Center'},
        data: {
          content: `<ul>
                        <li>The Registration Fees is non refundable.</li>
                        <li>Training fees at the time of joining is not accepted in installments.</li>
                        <li>After submission of the total fees, if the trainee wants to leave, he/she will have to pay INR 1,000 as a penalty.</li>
                        <li>The amount will be refunded after deducting the registration cost, GST (Included in the Training Fee), the amount charged as penalty and the charges deducted as per the classes taken in the training program.</li>
                        <li>The Trainee should take good care of all their personal belongings (For example -laptops, vehicle, helmet, mobile etc). The company holds no responsibility for any kind of Loss/Damage/Theft.</li>
                        <li>If any Trainee is medically unfit during the training tenure, company is not responsible for the same. Company can only assist the trainee for medical aids.</li>
                        <li>If Trainee is suffering from any kind of infectious disease, company will not allow him/her to attend the classes. The recovery classes will be provided once the trainee is medically fit.</li>
                        <li>Trainees, who are not a resident of Lucknow, are supposed to provide the local address at the time of joining.</li>
                        <li>If any Trainee is found spoiling the company’s asset, he/she will be charged a penalty, two times of the original cost of the asset.</li>
                        <li>A minimum of 85% attendance is mandatory for all the trainees in order to receive the Certificate of Completion for the training. In order to score high grade, 100% attendance is compulsory.</li>
                        <li>Trainees should get their assignments checked by their respective consultants in order to score high grade in their Certificates.</li>
                        <li>Identity Cards issued during the training are mandatory to wear in Robotutor Tech premises.</li>
                        <li>Trainees are supposed to maintain the discipline and decorum of the company. If any Trainee is found guilty of his action in ruining the image of the company, company can take strict legal actions and can expel the Trainee without refunding the fee.</li>
                        <li>For any queries, Trainees can contact at <a href="mailto:contact@robotutortech.com">contact@robotutortech.com</a></li>
                    </ul>`
        }
      },
      {
        widget: 'TextWithCTA',
        data: {
          text: 'Get in touch with us',
          link: '/contact-us',
          ctaText: 'Get in touch'
        }
      }
    ]
  }
}
