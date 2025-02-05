import { BadGLTFFileError } from '../../../errors/engine/gltf/bad_gltf_file';
import type { GLTFScene } from './gltf_scene';

interface GLTFAssetInfo {
	generator: string;
	version: string;
}

export class GLTFFile {
	private readonly _assetInfo: GLTFAssetInfo;
	private readonly _scenes: GLTFScene[];
	private readonly _defaultScene: GLTFScene;

	constructor(assetInfo: GLTFAssetInfo, scenes: GLTFScene[], defaultSceneIndex: number) {
		if (defaultSceneIndex < 0 || defaultSceneIndex >= scenes.length)
			throw new BadGLTFFileError(
				`Cannot set default scene as '${defaultSceneIndex}' for a collection of '${scenes.length}' scenes`,
			);
		this._assetInfo = assetInfo;
		this._scenes = scenes;
		this._defaultScene = scenes[defaultSceneIndex];
	}

	get assetInfo() {
		return this._assetInfo;
	}

	get scenes() {
		return this._scenes;
	}

	get defaultScene() {
		return this._defaultScene;
	}
}
