import { BadGLTFFileError } from '../../../errors/engine/gltf/bad_gltf_file';
import { Quaternion } from '../quaternion/quaternion';
import { Vec3 } from '../vec/vec3';
import type { GLTFAnimation } from './gltf_animation';
import type { GLTFCamera } from './gltf_camera';
import type { GLTFLight } from './gltf_light';
import type { GLTFMesh } from './gltf_mesh';

export abstract class GLTFNode {
	private readonly _name: string;
	private readonly _rotation: Quaternion;
	private readonly _translation: Vec3;
	private readonly _scale: Vec3;
	private readonly _animations: GLTFAnimation[] = []; // animations will always be registered after the nodes construction

	constructor(name: string, rotation: number[], translation: number[], scale: number[]) {
		if (rotation.length !== 4)
			throw new BadGLTFFileError(
				`Invalid node rotation quaternion of length ${rotation.length} for node '${name}'`,
			);

		this._name = name;
		this._rotation = Quaternion.fromArrayXYZW(rotation);
		this._translation = Vec3.fromArray(translation);
		this._scale = Vec3.fromArray(scale);
	}

	registerAnimation(a: GLTFAnimation) {
		this._animations.push(a);
	}

	get name() {
		return this._name;
	}

	get rotation() {
		return this._rotation;
	}

	get translation() {
		return this._translation;
	}

	get scale() {
		return this._scale;
	}
}

export class GLTFNodeMesh extends GLTFNode {
	private readonly _mesh: GLTFMesh;

	constructor(name: string, rotation: number[], translation: number[], scale: number[], mesh: GLTFMesh) {
		super(name, rotation, translation, scale);
		this._mesh = mesh;
	}

	get mesh() {
		return this._mesh;
	}
}

export class GLTFNodeCamera extends GLTFNode {
	private readonly _camera: GLTFCamera;

	constructor(name: string, rotation: number[], translation: number[], scale: number[], camera: GLTFCamera) {
		super(name, rotation, translation, scale);
		this._camera = camera;
	}

	get camera() {
		return this._camera;
	}
}

export class GLTFNodeLight extends GLTFNode {
	private readonly _light: GLTFLight;

	constructor(name: string, rotation: number[], translation: number[], scale: number[], light: GLTFLight) {
		super(name, rotation, translation, scale);
		this._light = light;
	}

	get light() {
		return this._light;
	}
}
