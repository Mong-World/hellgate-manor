import * as THREE from "three";

export class GrabSystem {
  constructor({ camera, domElement, getEnemies, onRelease, onDirectClick }) {
    this.camera = camera;
    this.domElement = domElement;
    this.getEnemies = getEnemies;
    this.onRelease = onRelease;
    this.onDirectClick = onDirectClick;
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.previousPointer = new THREE.Vector2();
    this.dragPlane = new THREE.Plane();
    this.planeHit = new THREE.Vector3();
    this.target = new THREE.Vector3();
    this.initialGrabPosition = new THREE.Vector3();
    this.heldEnemy = null;
    this.springVelocity = new THREE.Vector3();
    this.pointerHistory = [];
    this.maxHistoryAge = 0.15;
    this.depthDrift = 0;
    this.enabled = false;

    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    window.addEventListener("pointerdown", this.onPointerDown);
    window.addEventListener("pointermove", this.onPointerMove);
    window.addEventListener("pointerup", this.onPointerUp);
    window.addEventListener("pointercancel", this.onPointerUp);
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    if (!enabled) this.forceRelease();
  }

  setPointer(event) {
    const rect = this.domElement.getBoundingClientRect();
    this.previousPointer.copy(this.pointer);
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  onPointerDown(event) {
    if (!this.enabled || event.button !== 0) return;
    const enemies = this.getEnemies().filter(
      (enemy) => !enemy.dead && !enemy.removed && (enemy.isPickable?.() || enemy.canDirectClick?.())
    );
    this.setPointer(event);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObjects(enemies.map((enemy) => enemy.group), true);
    if (!hits.length) return;

    const enemy = hits[0].object.userData.enemy;
    if (!enemy || enemy.dead || enemy.removed) return;

    if (enemy.canDirectClick?.()) {
      event.preventDefault();
      this.onDirectClick?.(enemy);
      return;
    }

    if (!enemy.isPickable?.()) return;
    if (!enemy.beginGrab()) return;

    this.heldEnemy = enemy;
    this.initialGrabPosition.copy(enemy.position);
    this.springVelocity.copy(enemy.velocity);
    enemy.velocity.set(0, 0, 0);
    this.depthDrift = 0;

    const cameraDirection = new THREE.Vector3();
    this.camera.getWorldDirection(cameraDirection);
    this.dragPlane.setFromNormalAndCoplanarPoint(cameraDirection, enemy.position);
    this.updateTargetFromPointer();
    this.pointerHistory.length = 0;
    this.recordHistory();
    document.body.classList.add("grabbing");
  }

  onPointerMove(event) {
    this.setPointer(event);
    if (!this.heldEnemy) return;
    const horizontalDelta = this.pointer.x - this.previousPointer.x;
    this.depthDrift = THREE.MathUtils.clamp(this.depthDrift + horizontalDelta * 6, -4.2, 4.2);
    this.updateTargetFromPointer();
    this.recordHistory();
  }

  updateTargetFromPointer() {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    if (!this.raycaster.ray.intersectPlane(this.dragPlane, this.planeHit)) return;
    this.target.copy(this.planeHit);
    this.target.x = THREE.MathUtils.clamp(this.target.x, -23, 17.5);
    this.target.y = THREE.MathUtils.clamp(this.target.y, 0.04, 15);
    this.target.z = THREE.MathUtils.clamp(
      this.initialGrabPosition.z + this.depthDrift + this.planeHit.z * 0.15,
      -6.5,
      6.5
    );
  }

  recordHistory() {
    const now = performance.now() / 1000;
    this.pointerHistory.push({ time: now, position: this.target.clone() });
    while (this.pointerHistory.length > 2 && now - this.pointerHistory[0].time > this.maxHistoryAge) {
      this.pointerHistory.shift();
    }
  }

  update(dt) {
    if (!this.heldEnemy) return;
    const massScale = this.heldEnemy.type === "brute" ? 0.63 : 1;
    const stiffness = 92 * massScale;
    const damping = this.heldEnemy.type === "brute" ? 13 : 10.8;
    const displacement = this.target.clone().sub(this.heldEnemy.position);
    this.springVelocity.addScaledVector(displacement, stiffness * dt);
    this.springVelocity.multiplyScalar(Math.exp(-damping * dt));
    this.heldEnemy.position.addScaledVector(this.springVelocity, dt);
    this.heldEnemy.updatePeakHeight();
    this.heldEnemy.group.rotation.z = THREE.MathUtils.lerp(
      this.heldEnemy.group.rotation.z,
      -this.springVelocity.x * 0.048,
      0.18
    );
    this.heldEnemy.group.rotation.x = THREE.MathUtils.lerp(
      this.heldEnemy.group.rotation.x,
      this.springVelocity.z * 0.045,
      0.18
    );
    this.recordHistory();
  }

  calculateReleaseVelocity() {
    if (this.pointerHistory.length < 2) return this.springVelocity.clone();
    const first = this.pointerHistory[0];
    const last = this.pointerHistory[this.pointerHistory.length - 1];
    const elapsed = Math.max(last.time - first.time, 0.016);
    const pointerVelocity = last.position.clone().sub(first.position).divideScalar(elapsed);
    const release = pointerVelocity.multiplyScalar(1.05).addScaledVector(this.springVelocity, 0.58);
    if (release.y < 0) release.y *= 1.38;
    release.z *= 1.15;
    return release.clampLength(0, 40);
  }

  onPointerUp() {
    if (!this.heldEnemy) return;
    const enemy = this.heldEnemy;
    const releaseVelocity = this.calculateReleaseVelocity();
    this.heldEnemy = null;
    this.pointerHistory.length = 0;
    this.springVelocity.set(0, 0, 0);
    document.body.classList.remove("grabbing");

    const handled = this.onRelease?.({
      enemy,
      velocity: releaseVelocity.clone(),
      position: enemy.position.clone()
    });
    if (handled !== true) enemy.launch(releaseVelocity);
  }

  forceRelease() {
    this.heldEnemy = null;
    this.pointerHistory.length = 0;
    this.springVelocity.set(0, 0, 0);
    document.body.classList.remove("grabbing");
  }

  isHolding(enemy) {
    return this.heldEnemy === enemy;
  }

  dispose() {
    window.removeEventListener("pointerdown", this.onPointerDown);
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerup", this.onPointerUp);
    window.removeEventListener("pointercancel", this.onPointerUp);
  }
}
