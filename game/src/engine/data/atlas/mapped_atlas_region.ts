import { Vec2 } from '../vec/vec2';
import type { AtlasTreeNode } from './atlas_tree';

export class MappedAtlasRegion {
    private readonly _size: Vec2;

    constructor(
        public lowerCorner: Vec2,
        public higherCorner: Vec2,
        public uvLowerCorner: Vec2,
        public uvHigherCorner: Vec2,
        private readonly _treeNode: AtlasTreeNode,
    ) {
        this._size = new Vec2(higherCorner.x - lowerCorner.x, higherCorner.y - lowerCorner.y);
    }

    get treeNode() {
        return this._treeNode;
    }

    get size() {
        return this._size;
    }
}
