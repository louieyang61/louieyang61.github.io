document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  
  // Toggle sidebar and hamburger icon when clicked
  menuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('show');
    menuToggle.classList.toggle('active'); 
    document.body.classList.toggle('sidebar-open');
  });
  
  // Close sidebar when a link is clicked
  const navLinks = document.querySelectorAll('#navMenu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 900) {
        sidebar.classList.remove('show');
        menuToggle.classList.remove('active');
        document.body.classList.remove('sidebar-open');
      }
    });
  });
  
  // Handle click outside sidebar on mobile
  document.addEventListener('click', function(event) {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnMenuToggle = menuToggle.contains(event.target);
    
    if (!isClickInsideSidebar && !isClickOnMenuToggle && sidebar.classList.contains('show')) {
      sidebar.classList.remove('show');
      menuToggle.classList.remove('active');
      document.body.classList.remove('sidebar-open');
    }
  });
}); 