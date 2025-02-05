import type { GLTFAccessor } from './gltf_accessor';
import type { GLTFMaterial } from './gltf_material';

export interface GLTFMeshPrimitive {
	attributes: {
		POSITION: GLTFAccessor;
		TEXCOORD_0: GLTFAccessor;
		NORMAL: GLTFAccessor;
		TANGENT: GLTFAccessor;
	};

	indices: GLTFAccessor;
	material: GLTFMaterial;
}
