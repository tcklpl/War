import { SkyboxShader } from '../../../../shaders/geometry/skybox/skybox_shader';
import type { RenderInitializationResources } from '../render_initialization_resources';
import type { RenderResourcePool } from '../render_resource_pool';
import type { RenderStage } from './render_stage';

export class RenderStageSkybox implements RenderStage {
    private _shader!: SkyboxShader;
    private _pipeline!: GPURenderPipeline;
    private _renderPassDescriptor!: GPURenderPassDescriptor;
    private _viewProjBindGroup!: GPUBindGroup;

    async initialize(resources: RenderInitializationResources) {
        await new Promise<void>(r => {
            this._shader = new SkyboxShader('rs skybox shader', () => r());
        });

        this._pipeline = await this.createPipeline(resources.renderResourcePool.hdrTextureFormat);
        this._renderPassDescriptor = this.createRenderPassDescriptor();
        this._viewProjBindGroup = this.createViewProjBindGroup(resources.renderResourcePool.viewProjBuffer);
    }

    private createPipeline(hdrTextureFormat: GPUTextureFormat) {
        return device.createRenderPipelineAsync({
            label: `rs skybox pipeline`,
            layout: 'auto',
            vertex: {
                module: this._shader.module,
                entryPoint: 'vertex',
                buffers: [] as GPUVertexBufferLayout[],
            },
            fragment: {
                module: this._shader.module,
                entryPoint: 'fragment',
                targets: [{ format: hdrTextureFormat }],
            },
            primitive: {
                topology: 'triangle-list',
                cullMode: 'front',
            },
            depthStencil: {
                depthWriteEnabled: false,
                depthCompare: 'less-equal',
                format: 'depth24plus',
            },
        });
    }

    private createRenderPassDescriptor() {
        return {
            colorAttachments: [
                {
                    // view: undefined, Assigned later
                    // resolveTarget: undefined, Assigned Later
                    clearValue: { r: 0, g: 0, b: 0, a: 1 },
                    loadOp: 'load',
                    storeOp: 'store',
                },
            ] as GPURenderPassColorAttachment[],
            depthStencilAttachment: {
                // view: undefined, Assigned later
                depthReadOnly: true,
            } as GPURenderPassDepthStencilAttachment,
        } as GPURenderPassDescriptor;
    }

    private createViewProjBindGroup(buffer: GPUBuffer) {
        return device.createBindGroup({
            label: 'PBR ViewProj',
            layout: this._pipeline.getBindGroupLayout(SkyboxShader.BINDING_GROUPS.VIEWPROJ),
            entries: [{ binding: 0, resource: { buffer: buffer } }],
        });
    }

    private setDepthTexture(depthTex: GPUTextureView) {
        (this._renderPassDescriptor.depthStencilAttachment as GPURenderPassDepthStencilAttachment).view = depthTex;
    }

    private setColorTexture(colorTex: GPUTextureView) {
        (this._renderPassDescriptor.colorAttachments as GPURenderPassColorAttachment[])[0].view = colorTex;
    }

    render(pool: RenderResourcePool) {
        if (!pool.scene.activeSkybox) return;

        pool.commandEncoder.pushDebugGroup('Skybox Renderer');
        this.setDepthTexture(pool.depthTextureView);
        this.setColorTexture(pool.hdrBufferChain.current.view);
        const rpe = pool.commandEncoder.beginRenderPass(this._renderPassDescriptor);

        rpe.setPipeline(this._pipeline);
        rpe.setBindGroup(SkyboxShader.BINDING_GROUPS.VIEWPROJ, this._viewProjBindGroup);
        rpe.setBindGroup(
            SkyboxShader.BINDING_GROUPS.TEXTURE,
            pool.scene.activeSkybox.getBindGroup(this._pipeline).skybox,
        );
        rpe.draw(36);
        rpe.end();
        pool.commandEncoder.popDebugGroup();
    }
}
