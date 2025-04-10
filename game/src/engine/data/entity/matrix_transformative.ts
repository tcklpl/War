import { BufferUtils } from '../../../utils/buffer_utils';
import { MathUtils } from '../../../utils/math_utils';
import { Animatable, AnimationInterpolation, EncodedAnimationTarget } from '../animation/animatable';
import { Mat4 } from '../mat/mat4';
import { Quaternion } from '../quaternion/quaternion';
import { Vec3 } from '../vec/vec3';
import { Vec4 } from '../vec/vec4';

export class MatrixTransformative implements Animatable {
    private _parent?: MatrixTransformative;
    private _children: MatrixTransformative[] = [];

    private _translation = Vec3.fromValue(0);
    private _rotation = Quaternion.fromEulerAnglesRadians(0, 0, 0);
    private _scale = Vec3.fromValue(1);

    private _translationMatrix = Mat4.identity();
    private _rotationMatrix = Mat4.identity();
    private _scaleMatrix = Mat4.identity();

    private _modelMatrix = Mat4.identity();
    private _modelMatrixInverse = Mat4.identity();
    private readonly _modelMatrixUniformBuffer = BufferUtils.createEmptyBuffer(
        3 * Mat4.byteSize + 2 * Vec4.byteSize + 4,
        GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    );

    private _windingOrder: 'cw' | 'ccw' = 'ccw';

    private readonly _transformListeners: (() => void)[] = [];

    private buildModelMatrix() {
        this._modelMatrix = Mat4.identity()
            .multiply(this._translationMatrix)
            .multiply(this._rotationMatrix)
            .multiply(this._scaleMatrix);

        if (this._parent) {
            this._modelMatrix = this._parent.modelMatrix.multiply(this._modelMatrix);
        }

        this._modelMatrixInverse = this._modelMatrix.inverse();

        // models that have a negative transformation matrix should be drawn in clockwise winding order, this allows mirrored geometry
        this._windingOrder = this._modelMatrix.determinant >= 0 ? 'ccw' : 'cw';

        device.queue.writeBuffer(this._modelMatrixUniformBuffer, 0, this._modelMatrix.asF32Array);
        device.queue.writeBuffer(this._modelMatrixUniformBuffer, Mat4.byteSize, this._modelMatrixInverse.asF32Array);

        // update children
        this._children.forEach(c => c.buildModelMatrix());

        // update listeners
        this._transformListeners.forEach(t => t());
    }

    buildTranslationMatrix() {
        this._translationMatrix = Mat4.translation(this._translation.x, this._translation.y, this._translation.z);
    }

    buildRotationMatrix() {
        this._rotationMatrix = this._rotation.asMat4;
    }

    buildScaleMatrix() {
        this._scaleMatrix = Mat4.scaling(this._scale.x, this._scale.y, this._scale.z);
    }

    onTransform(t: () => void) {
        this._transformListeners.push(t);
    }

    get translation() {
        return this._translation;
    }

    set translation(t: Vec3) {
        this._translation = t;
        this._translationMatrix = Mat4.translation(t.x, t.y, t.z);
        this.buildModelMatrix();
    }

    translate(by: Vec3) {
        this.translation = this._translation.add(by);
    }

    get rotationQuaternion() {
        return this._rotation;
    }

    set rotationQuaternion(q: Quaternion) {
        this._rotation = q;
        this.buildRotationMatrix();
        this.buildModelMatrix();
    }

    set rotationEulerRadians(r: Vec3) {
        this._rotation = Quaternion.fromEulerAnglesRadians(r.x, r.y, r.z);
        this.buildRotationMatrix();
        this.buildModelMatrix();
    }

    set rotationEulerDegrees(r: Vec3) {
        this._rotation = Quaternion.fromEulerAnglesRadians(
            MathUtils.degToRad(r.x),
            MathUtils.degToRad(r.y),
            MathUtils.degToRad(r.z),
        );
        this.buildRotationMatrix();
        this.buildModelMatrix();
    }

    get scale() {
        return this._scale;
    }

    set scale(s: Vec3) {
        this._scale = s;
        this.buildScaleMatrix();
        this.buildModelMatrix();
    }

    scaleBy(by: Vec3) {
        this.scale = this.scale.hadamardProduct(by);
    }

    get modelMatrix() {
        return this._modelMatrix;
    }

    get parent() {
        return this._parent;
    }

    set parent(p: MatrixTransformative | undefined) {
        this._parent = p;
        this.buildModelMatrix();
    }

    get children() {
        return this._children;
    }

    set children(c: MatrixTransformative[]) {
        this._children = c;
    }

    get modelMatrixUniformBuffer() {
        return this._modelMatrixUniformBuffer;
    }

    get windingOrder() {
        return this._windingOrder;
    }

    readonly animation = {
        encoders: {
            translate(by: Vec3, interpolation: AnimationInterpolation = 'linear') {
                return {
                    target: 'translate',
                    value: by,
                    type: 'incrementor',
                    getter: 'translation',
                    setter: 'translate',
                    interpolation,
                } as EncodedAnimationTarget;
            },
            setTranslation(target: Vec3, interpolation: AnimationInterpolation = 'linear') {
                return {
                    target: 'translate',
                    value: target,
                    type: 'setter',
                    getter: 'translation',
                    setter: 'translate',
                    interpolation,
                } as EncodedAnimationTarget;
            },
            scale(by: Vec3, interpolation: AnimationInterpolation = 'linear') {
                return {
                    target: 'scale',
                    value: by,
                    type: 'incrementor',
                    getter: 'scale',
                    setter: 'scale',
                    interpolation,
                } as EncodedAnimationTarget;
            },
            setScale(target: Vec3, interpolation: AnimationInterpolation = 'linear') {
                return {
                    target: 'scale',
                    value: target,
                    type: 'setter',
                    getter: 'scale',
                    setter: 'scale',
                    interpolation,
                } as EncodedAnimationTarget;
            },
            rotate(by: Quaternion, interpolation: AnimationInterpolation = 'linear') {
                return {
                    target: 'rotate',
                    value: by,
                    type: 'incrementor',
                    getter: 'rotation',
                    setter: 'rotate',
                    interpolation,
                } as EncodedAnimationTarget;
            },
            setRotation(target: Quaternion, interpolation: AnimationInterpolation = 'linear') {
                return {
                    target: 'rotate',
                    value: target,
                    type: 'setter',
                    getter: 'rotation',
                    setter: 'rotate',
                    interpolation,
                } as EncodedAnimationTarget;
            },
        },
        getters: {
            translation: () => {
                return this._translation;
            },
            scale: () => {
                return this._scale;
            },
            rotation: () => {
                return this._rotation;
            },
        },
        setters: {
            translate: (by: Vec3) => {
                this.translation = by;
            },
            scale: (by: Vec3) => {
                this.scale = by;
            },
            rotate: (by: Quaternion) => {
                this.rotationQuaternion = by;
            },
        },
        accumulators: {
            translate: (by: Vec3) => {
                this.translation = this.translation.add(by);
            },
            scale: (by: Vec3) => {
                this.scale = this.scale.add(by);
            },
            rotate: (by: Quaternion) => {
                this.rotationQuaternion = this.rotationQuaternion.add(by);
            },
        },
    };
}
