 const API = 'http://localhost:8080';

      function showSection(sectionId) {

          document.querySelectorAll('.section').forEach(section => {
              section.classList.remove('active');
          });

          document.getElementById(sectionId).classList.add('active');
      }

      document.addEventListener('DOMContentLoaded', () => {
          showSection('dashboard');
      });

