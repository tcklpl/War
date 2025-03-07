import { Manager } from '../../manager';
import { Mesh } from './mesh';

export class MeshManager extends Manager<Mesh> {
    freeMeshes() {
        this.all.forEach(m => m.free());
    }
}
