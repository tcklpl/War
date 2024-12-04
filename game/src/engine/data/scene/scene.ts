import type { Camera } from '../camera/camera';
import type { Entity } from '../entity/entity';
import type { Light } from '../lights/light';
import { BlackSkybox } from '../skybox/black_skybox';
import type { Skybox } from '../skybox/skybox';
import { SceneInfo } from './scene_info';

export class Scene {
    private readonly _entities: Entity[];
    private readonly _cameras: Camera[];
    private readonly _lights: Light[];
    private readonly _skyboxes: Skybox[];

    private _activeCamera?: Camera;
    private _activeSkybox?: Skybox;

    private _sceneInfo!: SceneInfo;

    private readonly _entitiesPerWindingOrder = {
        cw: [] as Entity[],
        ccw: [] as Entity[],
    };

    constructor(
        private readonly _name: string,
        props: {
            entities: Entity[];
            cameras: Camera[];
            lights: Light[];
            skyboxes: Skybox[];

            activeCamera?: Camera;
            activeSkybox?: Skybox;
        },
    ) {
        this._entities = props.entities;
        this._cameras = props.cameras;
        this._lights = props.lights;
        this._skyboxes = props.skyboxes;

        this._activeCamera = props.activeCamera;
        this._activeSkybox = props.activeSkybox;
        this.buildWindingOrderCache();
        game.engine.managers.scene.register(this);
    }

    buildWindingOrderCache() {
        this._entitiesPerWindingOrder.cw = [];
        this._entitiesPerWindingOrder.ccw = [];

        this._entities.forEach(e => {
            switch (e.windingOrder) {
                case 'cw':
                    this._entitiesPerWindingOrder.cw.push(e);
                    break;
                case 'ccw':
                    this._entitiesPerWindingOrder.ccw.push(e);
                    break;
            }
        });
    }

    protected async buildSceneInfo() {
        let skybox = this._activeSkybox;
        if (!skybox) {
            skybox = new BlackSkybox();
            await skybox.initialize();
        }
        this._sceneInfo = new SceneInfo(this._lights, skybox);
    }

    private async updateSceneInfoSkybox() {
        let skybox = this._activeSkybox;
        if (!skybox) {
            skybox = new BlackSkybox();
            await skybox.initialize();
        }
        this._sceneInfo.skybox = skybox;
    }

    get activeCamera() {
        if (!this._activeCamera && this._cameras.length > 0) {
            console.log(`Scene '${this._name}' doesn't have an active camera, setting the first one as active`);
            this._activeCamera = this._cameras[0];
        }
        return this._activeCamera;
    }

    set activeCamera(c: Camera | undefined) {
        this._activeCamera = c;
    }

    get activeSkybox() {
        return this._activeSkybox;
    }

    set activeSkybox(s: Skybox | undefined) {
        const shouldUpdate = s !== this._activeSkybox;
        this._activeSkybox = s;
        if (shouldUpdate) this.updateSceneInfoSkybox();
    }

    get entitiesToRender() {
        return this._entities;
    }

    get entitiesPerWindingOrder() {
        return this._entitiesPerWindingOrder;
    }

    get lights() {
        return this._lights;
    }

    get skyboxes() {
        return this._skyboxes;
    }

    get info() {
        return this._sceneInfo;
    }

    free() {
        this.info.free();
        this._skyboxes.forEach(s => s.free());
    }
}
