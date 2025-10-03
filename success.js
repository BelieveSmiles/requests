// 获取Canvas元素和上下文
const canvas = document.getElementById('birthdayCanvas');
const ctx = canvas.getContext('2d');

// 设置Canvas尺寸为窗口大小
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 星星数组
const stars = [];
const starCount = 200;

// 创建星星
for (let i = 0; i < starCount; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5,
        opacity: Math.random()
    });
}

// 粒子数组
const particles = [];
const particleCount = 100;

// 创建粒子
for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        opacity: Math.random()
    });
}

// 烟花数组
const fireworks = [];

// 绘制函数
function draw() {
    // 创建渐变背景
    const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
    );
    gradient.addColorStop(0, 'rgba(10, 10, 40, 0.8)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制星星
    ctx.fillStyle = 'white';
    stars.forEach(star => {
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // 更新星星位置
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
        
        // 闪烁效果
        star.opacity = 0.5 + Math.sin(Date.now() * 0.001 + star.x) * 0.5;
    });
    
    // 绘制粒子
    particles.forEach(particle => {
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // 更新粒子位置
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // 边界检查
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        // 随机改变透明度
        particle.opacity = 0.3 + Math.sin(Date.now() * 0.002 + particle.x) * 0.7;
    });
    
    // 绘制和更新烟花
    fireworks.forEach((firework, index) => {
        firework.particles.forEach(particle => {
            ctx.globalAlpha = particle.opacity;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // 更新粒子位置
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.opacity -= 0.01;
            particle.radius -= 0.05;
        });
        
        // 移除透明度为0的粒子
        firework.particles = firework.particles.filter(p => p.opacity > 0 && p.radius > 0);
        
        // 如果烟花粒子全部消失，从数组中移除
        if (firework.particles.length === 0) {
            fireworks.splice(index, 1);
        }
    });
    
    ctx.globalAlpha = 1;
}

// 创建烟花
function createFirework(x, y) {
    const particles = [];
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    
    for (let i = 0; i < 100; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        
        particles.push({
            x: x,
            y: y,
            radius: Math.random() * 3 + 1,
            color: color,
            speedX: Math.cos(angle) * speed,
            speedY: Math.sin(angle) * speed,
            opacity: 1
        });
    }
    
    fireworks.push({ particles });
}

// 动画循环
function animate() {
    draw();
    requestAnimationFrame(animate);
}

// 随机生成烟花
function randomFireworks() {
    if (Math.random() < 0.05) { // 5%的几率生成烟花
        createFirework(
            Math.random() * canvas.width,
            Math.random() * canvas.height / 2
        );
    }
}

// 窗口大小调整
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// 点击生成烟花
canvas.addEventListener('click', (e) => {
    createFirework(e.clientX, e.clientY);
});

// 启动动画
animate();

// 定期生成随机烟花
setInterval(randomFireworks, 500);

// 初始烟花爆发
setTimeout(() => {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFirework(
                Math.random() * canvas.width,
                Math.random() * canvas.height / 2
            );
        }, i * 300);
    }
}, 1000);