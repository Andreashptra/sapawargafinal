{{-- ==========================================================
     Chatbot SI KUYUNG — Partial Blade
     Include di halaman mana saja: @include('components.chatbot')
     ========================================================== --}}

{{-- Alpine.js State --}}
<div x-data="chatbotApp()" x-cloak>

    {{-- ===================== 3D Character Trigger ===================== --}}
    <div id="chatbot-trigger"
         @click="toggleChat()"
         style="position:fixed; bottom:16px; left:24px; width:120px; height:120px; z-index:99998; cursor:pointer;"
         title="Tanya SI KUYUNG">
        <canvas id="gatotkaca-canvas" style="width:100%; height:100%;"></canvas>
        {{-- Pulse ring --}}
        <span style="position:absolute;bottom:5px;left:5px;width:18px;height:18px;background:#029058;border:3px solid #fff;border-radius:50%;animation:pulse-ring 2s infinite;"></span>
    </div>

    {{-- ===================== Chat Window ===================== --}}
    <div x-show="open" x-transition:enter="transition ease-out duration-300"
         x-transition:enter-start="opacity-0 translate-y-4 scale-95"
         x-transition:enter-end="opacity-100 translate-y-0 scale-100"
         x-transition:leave="transition ease-in duration-200"
         x-transition:leave-start="opacity-100 translate-y-0 scale-100"
         x-transition:leave-end="opacity-0 translate-y-4 scale-95"
         style="position:fixed; bottom:145px; left:24px; width:380px; max-width:calc(100vw - 40px); z-index:99999;
                border-radius:20px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,.22);
                display:flex; flex-direction:column; max-height:calc(100vh - 170px); height:520px; background:#fff; font-family:'Poppins',sans-serif;">

        {{-- Header --}}
        <div style="background:linear-gradient(135deg,#029058,#016e43); padding:14px 18px; display:flex; align-items:center; gap:12px; flex-shrink:0;">
            <div style="width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;">
                <svg width="22" height="22" fill="none" stroke="#fff" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div style="flex:1;">
                <div style="color:#fff;font-weight:700;font-size:15px;">SI KUYUNG</div>
                <div style="color:rgba(255,255,255,.7);font-size:10px;">Sistem Informasi Kunjungan & Layanan Warga • Online</div>
            </div>
            <button @click="open=false" style="background:rgba(255,255,255,.15);border:none;color:#fff;width:32px;height:32px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:.2s;">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
        </div>

        {{-- Messages --}}
        <div id="chat-messages" x-ref="chatMessages"
             style="flex:1; min-height:0; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:12px; background:#f5f7fa;">

            {{-- Welcome --}}
            <template x-if="messages.length===0">
                <div style="text-align:center;padding:16px 10px;">
                    <div style="font-size:36px;margin-bottom:8px;">🛡️</div>
                    <div style="font-weight:600;color:#1a1a2e;font-size:14px;">Halo! Saya SI KUYUNG</div>
                    <div style="color:#888;font-size:11px;margin-top:4px;line-height:1.5;">Sistem Informasi Kunjungan dan Layanan Warga Terpadu<br>Kecamatan Kebonagung. Ada yang bisa saya bantu?</div>
                    <div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:12px;">
                        <button @click="sendQuick('Cara membuat pengaduan')" style="background:rgba(2,144,88,.08);color:#029058;border:1px solid rgba(2,144,88,.2);border-radius:50px;padding:6px 14px;font-size:12px;cursor:pointer;transition:.2s;font-family:inherit;">📝 Cara melapor</button>
                        <button @click="sendQuick('Cara melacak pengaduan')" style="background:rgba(2,144,88,.08);color:#029058;border:1px solid rgba(2,144,88,.2);border-radius:50px;padding:6px 14px;font-size:12px;cursor:pointer;transition:.2s;font-family:inherit;">🔍 Lacak aduan</button>
                        <button @click="sendQuick('Cara mendaftar')" style="background:rgba(2,144,88,.08);color:#029058;border:1px solid rgba(2,144,88,.2);border-radius:50px;padding:6px 14px;font-size:12px;cursor:pointer;transition:.2s;font-family:inherit;">📋 Cara daftar</button>
                    </div>
                </div>
            </template>

            {{-- Message Bubbles --}}
            <template x-for="(msg, i) in messages" :key="i">
                <div :style="msg.from==='user'
                    ? 'align-self:flex-end;max-width:80%;'
                    : 'align-self:flex-start;max-width:85%;'">
                    <div :style="msg.from==='user'
                        ? 'background:#029058;color:#fff;padding:10px 16px;border-radius:16px 16px 4px 16px;font-size:13px;line-height:1.6;'
                        : 'background:#fff;color:#333;padding:10px 16px;border-radius:16px 16px 16px 4px;font-size:13px;line-height:1.6;box-shadow:0 2px 8px rgba(0,0,0,.06);'"
                         x-html="formatMsg(msg.text)" style="white-space:pre-line;">
                    </div>
                    <div :style="msg.from==='user'?'text-align:right':'text-align:left'"
                         style="font-size:10px;color:#aaa;margin-top:4px;padding:0 4px;" x-text="msg.time"></div>
                </div>
            </template>

            {{-- Typing indicator --}}
            <div x-show="typing" style="align-self:flex-start;">
                <div style="background:#fff;padding:10px 18px;border-radius:16px 16px 16px 4px;box-shadow:0 2px 8px rgba(0,0,0,.06);display:flex;gap:5px;align-items:center;">
                    <span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>
                </div>
            </div>
        </div>

        {{-- Input --}}
        <div style="padding:12px 14px;background:#fff;border-top:1px solid #eee;display:flex;gap:10px;align-items:center;flex-shrink:0;">
            <input x-model="input" @keydown.enter="sendMessage()" type="text"
                   placeholder="Ketik pesan..."
                   style="flex:1;border:1px solid #e0e0e0;border-radius:50px;padding:10px 18px;font-size:13px;outline:none;font-family:inherit;transition:.2s;"
                   onfocus="this.style.borderColor='#029058';this.style.boxShadow='0 0 0 3px rgba(2,144,88,.1)'"
                   onblur="this.style.borderColor='#e0e0e0';this.style.boxShadow='none'">
            <button @click="sendMessage()"
                    :disabled="!input.trim()"
                    style="width:40px;height:40px;border-radius:50%;background:#029058;border:none;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:.2s;flex-shrink:0;"
                    :style="!input.trim()?'opacity:.5;cursor:not-allowed':''">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
            </button>
        </div>
    </div>
</div>

{{-- ===================== Styles ===================== --}}
<style>
[x-cloak]{display:none!important}
@keyframes pulse-ring{0%{box-shadow:0 0 0 0 rgba(2,144,88,.5)}70%{box-shadow:0 0 0 10px rgba(2,144,88,0)}100%{box-shadow:0 0 0 0 rgba(2,144,88,0)}}
@keyframes typing-bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-4px)}}
.typing-dot{width:7px;height:7px;border-radius:50%;background:#bbb;animation:typing-bounce .8s ease-in-out infinite}
.typing-dot:nth-child(2){animation-delay:.15s}
.typing-dot:nth-child(3){animation-delay:.3s}
#chat-messages::-webkit-scrollbar{width:5px}
#chat-messages::-webkit-scrollbar-track{background:transparent}
#chat-messages::-webkit-scrollbar-thumb{background:#ddd;border-radius:10px}
</style>

{{-- ===================== Three.js 3D Character ===================== --}}
<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script>

{{-- Alpine.js --}}
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<script>
// ── Three.js: 3D SI KUYUNG Robot Mascot ──────────────────────────
(function(){
    const canvas = document.getElementById('gatotkaca-canvas');
    if(!canvas) return;

    const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});
    renderer.setSize(120,120);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30,1,0.1,100);
    camera.position.set(0, 1.0, 4.0);
    camera.lookAt(0,0.8,0);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(3,5,4);
    dirLight.castShadow = true;
    scene.add(dirLight);
    const rimLight = new THREE.DirectionalLight(0x88ffcc, 0.4);
    rimLight.position.set(-3,2,-2);
    scene.add(rimLight);

    // ── Character Group ──
    const character = new THREE.Group();
    scene.add(character);

    // === BODY (rounded torso) ===
    const bodyGeo = new THREE.CylinderGeometry(0.32, 0.28, 0.55, 16);
    const bodyMat = new THREE.MeshStandardMaterial({color:0x029058, metalness:0.1, roughness:0.5});
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.45;
    character.add(body);

    // Body highlight stripe
    const stripeGeo = new THREE.CylinderGeometry(0.33, 0.29, 0.06, 16);
    const stripeMat = new THREE.MeshStandardMaterial({color:0x03b96f, metalness:0.2, roughness:0.4});
    const stripe = new THREE.Mesh(stripeGeo, stripeMat);
    stripe.position.y = 0.50;
    character.add(stripe);

    // Body emblem (small golden circle on chest)
    const emblemGeo = new THREE.CircleGeometry(0.07, 16);
    const emblemMat = new THREE.MeshStandardMaterial({color:0xFFD700, metalness:0.6, roughness:0.2, side: THREE.DoubleSide});
    const emblem = new THREE.Mesh(emblemGeo, emblemMat);
    emblem.position.set(0, 0.52, 0.33);
    character.add(emblem);

    // === HEAD ===
    const headGeo = new THREE.SphereGeometry(0.30, 32, 32);
    const headMat = new THREE.MeshStandardMaterial({color:0xFFDBAC, metalness:0.05, roughness:0.6}); // skin tone
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 1.0;
    head.scale.set(1, 1.05, 0.95);
    character.add(head);

    // === SI KUYUNG HELMET/CROWN ===
    // Main helmet
    const helmetGeo = new THREE.SphereGeometry(0.31, 32, 32, 0, Math.PI*2, 0, Math.PI*0.55);
    const helmetMat = new THREE.MeshStandardMaterial({color:0xFFD700, metalness:0.7, roughness:0.2});
    const helmet = new THREE.Mesh(helmetGeo, helmetMat);
    helmet.position.y = 1.08;
    helmet.scale.set(1, 0.9, 0.95);
    character.add(helmet);

    // Helmet front gem
    const gemGeo = new THREE.OctahedronGeometry(0.06, 0);
    const gemMat = new THREE.MeshStandardMaterial({color:0xff1744, metalness:0.3, roughness:0.1, emissive:0xff1744, emissiveIntensity:0.3});
    const gem = new THREE.Mesh(gemGeo, gemMat);
    gem.position.set(0, 1.18, 0.28);
    gem.rotation.z = Math.PI/4;
    character.add(gem);

    // Helmet wing left
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0,0);
    wingShape.quadraticCurveTo(0.15, 0.12, 0.28, 0.22);
    wingShape.quadraticCurveTo(0.18, 0.10, 0.10, 0.05);
    wingShape.quadraticCurveTo(0.05, 0.02, 0, 0);
    const wingExtSettings = {depth:0.02, bevelEnabled:false};
    const wingGeo = new THREE.ExtrudeGeometry(wingShape, wingExtSettings);
    const wingMat = new THREE.MeshStandardMaterial({color:0xFFD700, metalness:0.6, roughness:0.25, side:THREE.DoubleSide});

    const wingL = new THREE.Mesh(wingGeo, wingMat);
    wingL.position.set(-0.28, 1.12, 0.05);
    wingL.rotation.set(0, -0.3, 0.4);
    character.add(wingL);

    const wingR = new THREE.Mesh(wingGeo, wingMat);
    wingR.position.set(0.28, 1.12, 0.05);
    wingR.rotation.set(0, 0.3, -0.4);
    wingR.scale.x = -1;
    character.add(wingR);

    // === EYES ===
    const eyeGroup = new THREE.Group();

    // Eye whites
    const eyeWhiteGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const eyeWhiteMat = new THREE.MeshStandardMaterial({color:0xffffff});
    const leftEyeW = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat);
    leftEyeW.position.set(-0.11, 1.02, 0.25);
    leftEyeW.scale.set(1, 1.15, 0.6);
    eyeGroup.add(leftEyeW);
    const rightEyeW = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat);
    rightEyeW.position.set(0.11, 1.02, 0.25);
    rightEyeW.scale.set(1, 1.15, 0.6);
    eyeGroup.add(rightEyeW);

    // Pupils
    const pupilGeo = new THREE.SphereGeometry(0.035, 16, 16);
    const pupilMat = new THREE.MeshStandardMaterial({color:0x1a1a2e});
    const leftPupil = new THREE.Mesh(pupilGeo, pupilMat);
    leftPupil.position.set(-0.11, 1.02, 0.29);
    eyeGroup.add(leftPupil);
    const rightPupil = new THREE.Mesh(pupilGeo, pupilMat);
    rightPupil.position.set(0.11, 1.02, 0.29);
    eyeGroup.add(rightPupil);

    // Eye shine
    const shineGeo = new THREE.SphereGeometry(0.015, 8, 8);
    const shineMat = new THREE.MeshStandardMaterial({color:0xffffff, emissive:0xffffff, emissiveIntensity:0.5});
    const leftShine = new THREE.Mesh(shineGeo, shineMat);
    leftShine.position.set(-0.095, 1.035, 0.30);
    eyeGroup.add(leftShine);
    const rightShine = new THREE.Mesh(shineGeo, shineMat);
    rightShine.position.set(0.125, 1.035, 0.30);
    eyeGroup.add(rightShine);

    // Eyelids (for blink animation)
    const lidGeo = new THREE.SphereGeometry(0.068, 16, 16, 0, Math.PI*2, 0, Math.PI*0.5);
    const lidMat = new THREE.MeshStandardMaterial({color:0xFFDBAC});
    const leftLid = new THREE.Mesh(lidGeo, lidMat);
    leftLid.position.set(-0.11, 1.02, 0.24);
    leftLid.scale.set(1, 0.01, 0.6); // starts closed=0.01, open=0.01
    leftLid.rotation.x = Math.PI;
    eyeGroup.add(leftLid);
    const rightLid = new THREE.Mesh(lidGeo, lidMat);
    rightLid.position.set(0.11, 1.02, 0.24);
    rightLid.scale.set(1, 0.01, 0.6);
    rightLid.rotation.x = Math.PI;
    eyeGroup.add(rightLid);

    character.add(eyeGroup);

    // === MOUTH (smile) ===
    const smileCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-0.08, 0.90, 0.27),
        new THREE.Vector3(0, 0.87, 0.30),
        new THREE.Vector3(0.08, 0.90, 0.27)
    );
    const smileGeo = new THREE.TubeGeometry(smileCurve, 12, 0.012, 8, false);
    const smileMat = new THREE.MeshStandardMaterial({color:0xc0392b});
    const smile = new THREE.Mesh(smileGeo, smileMat);
    character.add(smile);

    // === ARMS ===
    const armGeo = new THREE.CapsuleGeometry(0.07, 0.30, 8, 8);
    const armMat = new THREE.MeshStandardMaterial({color:0x029058, metalness:0.1, roughness:0.5});

    // Left arm
    const leftArm = new THREE.Group();
    const leftArmMesh = new THREE.Mesh(armGeo, armMat);
    leftArmMesh.position.y = -0.15;
    leftArm.add(leftArmMesh);
    leftArm.position.set(-0.42, 0.65, 0);
    leftArm.rotation.z = 0.2;
    character.add(leftArm);

    // Left hand
    const handGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const handMat = new THREE.MeshStandardMaterial({color:0xFFDBAC});
    const leftHand = new THREE.Mesh(handGeo, handMat);
    leftHand.position.y = -0.32;
    leftArm.add(leftHand);

    // Right arm (will wave!)
    const rightArm = new THREE.Group();
    const rightArmMesh = new THREE.Mesh(armGeo, armMat);
    rightArmMesh.position.y = -0.15;
    rightArm.add(rightArmMesh);
    rightArm.position.set(0.42, 0.65, 0);
    rightArm.rotation.z = -0.2;
    character.add(rightArm);

    // Right hand
    const rightHand = new THREE.Mesh(handGeo, handMat);
    rightHand.position.y = -0.32;
    rightArm.add(rightHand);

    // === LEGS ===
    const legGeo = new THREE.CapsuleGeometry(0.08, 0.18, 8, 8);
    const legMat = new THREE.MeshStandardMaterial({color:0x016e43, metalness:0.1, roughness:0.5});
    const leftLeg = new THREE.Mesh(legGeo, legMat);
    leftLeg.position.set(-0.14, 0.08, 0);
    character.add(leftLeg);
    const rightLeg = new THREE.Mesh(legGeo, legMat);
    rightLeg.position.set(0.14, 0.08, 0);
    character.add(rightLeg);

    // Shoes
    const shoeGeo = new THREE.SphereGeometry(0.08, 12, 12);
    shoeGeo.scale(1.2, 0.6, 1.4);
    const shoeMat = new THREE.MeshStandardMaterial({color:0x333333, metalness:0.3, roughness:0.4});
    const leftShoe = new THREE.Mesh(shoeGeo, shoeMat);
    leftShoe.position.set(-0.14, -0.05, 0.03);
    character.add(leftShoe);
    const rightShoe = new THREE.Mesh(shoeGeo, shoeMat);
    rightShoe.position.set(0.14, -0.05, 0.03);
    character.add(rightShoe);

    // === CAPE (behind body) ===
    const capeShape = new THREE.Shape();
    capeShape.moveTo(-0.30, 0);
    capeShape.quadraticCurveTo(-0.35, -0.30, -0.15, -0.50);
    capeShape.quadraticCurveTo(0, -0.55, 0.15, -0.50);
    capeShape.quadraticCurveTo(0.35, -0.30, 0.30, 0);
    const capeGeo = new THREE.ShapeGeometry(capeShape);
    const capeMat = new THREE.MeshStandardMaterial({color:0xb71c1c, side:THREE.DoubleSide, metalness:0.1, roughness:0.6});
    const cape = new THREE.Mesh(capeGeo, capeMat);
    cape.position.set(0, 0.72, -0.25);
    cape.rotation.x = 0.15;
    character.add(cape);

    // Position entire character
    character.position.y = -0.2;
    character.scale.set(0.95, 0.95, 0.95);

    // ── Animation Loop ──
    const clock = new THREE.Clock();
    let blinkTimer = 0;
    let isBlinking = false;
    let wavePhase = 0;

    function animate(){
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        const dt = clock.getDelta();

        // Idle float (gentle bobbing)
        character.position.y = -0.2 + Math.sin(t * 1.8) * 0.04;

        // Gentle body sway
        character.rotation.y = Math.sin(t * 0.6) * 0.12;
        character.rotation.z = Math.sin(t * 0.8) * 0.02;

        // Head slight tilt
        head.rotation.z = Math.sin(t * 1.2) * 0.05;
        head.rotation.x = Math.sin(t * 0.7) * 0.03;
        helmet.rotation.z = head.rotation.z;
        helmet.rotation.x = head.rotation.x;

        // Arm wave animation (right arm waves periodically)
        wavePhase = t % 8; // every 8 seconds
        if(wavePhase < 3) {
            // Waving
            rightArm.rotation.z = -0.8 + Math.sin(t * 6) * 0.4;
            rightArm.rotation.x = Math.sin(t * 3) * 0.15;
        } else {
            // Rest position with gentle sway
            rightArm.rotation.z = -0.2 + Math.sin(t * 1.2) * 0.05;
            rightArm.rotation.x = 0;
        }

        // Left arm gentle sway
        leftArm.rotation.z = 0.2 + Math.sin(t * 1.0 + 1) * 0.06;

        // Eye pupil tracking (slight random movement)
        const px = Math.sin(t * 0.8) * 0.012;
        const py = Math.sin(t * 1.1) * 0.008;
        leftPupil.position.x = -0.11 + px;
        leftPupil.position.y = 1.02 + py;
        rightPupil.position.x = 0.11 + px;
        rightPupil.position.y = 1.02 + py;

        // Blink every ~3-5 seconds
        blinkTimer += 0.016;
        if(!isBlinking && blinkTimer > 3 + Math.random() * 2) {
            isBlinking = true;
            blinkTimer = 0;
        }
        if(isBlinking) {
            const blinkProgress = blinkTimer * 8;
            if(blinkProgress < 1) {
                const s = Math.sin(blinkProgress * Math.PI);
                leftLid.scale.y = 0.01 + s * 1.2;
                rightLid.scale.y = 0.01 + s * 1.2;
            } else {
                leftLid.scale.y = 0.01;
                rightLid.scale.y = 0.01;
                isBlinking = false;
            }
        }

        // Cape flutter
        cape.rotation.x = 0.15 + Math.sin(t * 2.5) * 0.06;
        cape.position.z = -0.25 + Math.sin(t * 2) * 0.02;

        // Gem glow pulse
        gem.material.emissiveIntensity = 0.3 + Math.sin(t * 3) * 0.2;

        renderer.render(scene, camera);
    }
    animate();
})();

// ── Alpine.js Chatbot App ─────────────────────────────────────
function chatbotApp(){
    return {
        open: false,
        input: '',
        messages: [],
        typing: false,

        toggleChat(){
            this.open = !this.open;
        },

        sendQuick(text){
            this.input = text;
            this.sendMessage();
        },

        async sendMessage(){
            const text = this.input.trim();
            if(!text) return;

            // Add user message
            this.messages.push({from:'user', text, time: this.now()});
            this.input = '';
            this.scrollBottom();

            // Show typing
            this.typing = true;
            this.scrollBottom();

            try {
                const res = await fetch('{{ route("chatbot.send") }}', {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json',
                        'X-CSRF-TOKEN': '{{ csrf_token() }}',
                        'Accept':'application/json'
                    },
                    body: JSON.stringify({message: text})
                });
                const data = await res.json();

                // Simulate slight delay for realism
                await new Promise(r => setTimeout(r, 600));

                this.typing = false;
                this.messages.push({from:'bot', text: data.reply, time: this.now()});
            } catch(e) {
                this.typing = false;
                this.messages.push({from:'bot', text:'⚠️ Maaf, terjadi kesalahan. Silakan coba lagi.', time: this.now()});
            }

            this.scrollBottom();
        },

        scrollBottom(){
            this.$nextTick(()=>{
                const el = this.$refs.chatMessages;
                if(el) el.scrollTop = el.scrollHeight;
            });
        },

        now(){
            return new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});
        },

        formatMsg(text){
            // Escape HTML, then convert newlines to <br>
            const escaped = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
            return escaped.replace(/\n/g, '<br>');
        }
    }
}
</script>
