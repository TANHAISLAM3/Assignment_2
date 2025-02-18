
//burger toggle menu//

document.querySelector('.burger').addEventListener('click', function() {
    document.querySelector('nav').classList.toggle('active');
});

// dark mode //
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('dark-mode-toggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        console.log('Script loaded successfully');
    });
  });

// page animation //
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                entry.target.classList.remove('hidden');
            } else {
                entry.target.classList.remove('show');
                entry.target.classList.add('hidden');
            }
        });
    }, { threshold: 0.1 }); // Adjust threshold as needed

    const hiddenElements = document.querySelectorAll('.profile, .text_box, .text_container, .description, .card, .image_1');
    hiddenElements.forEach((el) => observer.observe(el));
});

// student resources //
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("myinput").addEventListener("keyup", function() {
        let filterText = this.value.toLowerCase(); 
        let cards = document.querySelectorAll(".grid-item");

        cards.forEach(function(card) {
            let title = card.querySelector("h2").textContent.toLowerCase();
            let content = card.querySelector(".content").textContent.toLowerCase(); 

            // Checking if the search text is present in either the title or the content
            if (title.includes(filterText) || content.includes(filterText)) {
                card.parentElement.style.display = "flex";
            } else {
                card.parentElement.style.display = "none";
            }
            console.log('full.js is loaded');
        });
    });
});

// counter //
let count = 0;
// select value and buttons
const value = document.querySelector('counter_value');
const btns = document.querySelectorAll(".btn");

btns.forEach(function(btn){
    btn.addEventListerner("click", function(e){
        const styles = e.currentTarget.classList;
        if (styles.contains("decrease")){
            count--;
        }
        else if (styles.contains('increase')){
            count++;
        }
        else {

        }
        value.textContent = count;
    });
});

// about html //
var w, h, loopId, id, canvas, ctx, particles;

var options = {
  particleColor: "rgba(255,255,255)",
  lineColor: "rgba(0,181,255)",
  particleAmount: 30,
  defaultRadius: 2,
  variantRadius: 3,
  defaultSpeed: 1,
  variantSpeed: 1,
  linkRadius: 300
};

var rgb = options.lineColor.match(/\d+/g);

document.addEventListener("DOMContentLoaded", init);

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  resizeReset();
  initialiseElements();
  startAnimation();
}

function resizeReset() {
  w = canvas.width = window.innerHeight;
  h = canvas.height = window.innerHeight;
}

function initialiseElements() {
  particles = [];
  for (var i = 0; i < options.particleAmount; i++) {
    particles.push(new Particle());
  }
}

function startAnimation() {
  loopId = requestAnimationFrame(animationLoop);
}

function animationLoop() {
  ctx.clearRect(0,0,w,h);
  drawScene();

  id = requestAnimationFrame(animationLoop);
}

function drawScene() {
  drawLine();
  drawParticle();
}

function drawParticle() {
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
}

function drawLine() {
  for (var i = 0; i < particles.length; i++) {
    linkPoints(particles[i], particles);
  }
}

function linkPoints(point, hubs) {
  for (var i = 0; i < hubs.length; i++) {
    var distance = checkDistance(point.x, point.y, hubs[i].x, hubs[i].y);
    var opacity = 1 - distance / options.linkRadius;
    if (opacity > 0) {
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+','+opacity+')';
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(hubs[i].x, hubs[i].y);
      ctx.closePath();
      ctx.stroke();
    }
  }
}

function checkDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

Particle = function() {
  var _this = this;

  _this.x = Math.random() * w;
  _this.y = Math.random() * h;
  _this.color = options.particleColor;
  _this.radius = options.defaultRadius + Math.random() * options.variantRadius;
  _this.speed = options.defaultSpeed + Math.random() * options.variantSpeed;
  _this.directionAngle = Math.floor(Math.random() * 360);
  _this.vector = {
    x: Math.cos(_this.directionAngle) * _this.speed,
    y: Math.sin(_this.directionAngle) * _this.speed
  }

  _this.update = function() {
    _this.border();
    _this.x += _this.vector.x;
    _this.y += _this.vector.y;
  }

  _this.border = function() {
    if (_this.x >= w || _this.x <= 0) {
      _this.vector.x *= -1;
    }
    if (_this.y >= h || _this.y <= 0) {
      _this.vector.y *= -1;
    }
    if (_this.x > w) _this.x = w;
    if (_this.y > h) _this.y = h;
    if (_this.x < 0) _this.x = 0;
    if (_this.y < 0) _this.y = 0;
  }

  _this.draw = function() {
    ctx.beginPath();
    ctx.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = _this.color;
    ctx.fill();
  }
}
