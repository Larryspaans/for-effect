import{M as Et,O as zt,B as J,F as St,S as N,U as ot,V as B,b as st,H as it,c as Nt,T as Dt,C as P,e as H,A as lt,f as Lt,R as It,h as Ut,j as Ot,L as Gt,k as jt,l as Kt,m as Ft,n as Vt,p as Ht,q as Qt,r as O,s as Wt,t as Yt,u as $t,P as Xt,G as Zt,v as w,w as Ct,x as Rt,y as Jt,z as qt,D as te,E as ee}from"./index-xdjWmRx_.js";class W{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const se=new zt(-1,1,1,-1,0,1);class ie extends J{constructor(){super(),this.setAttribute("position",new St([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new St([0,2,0,0,2,0],2))}}const ae=new ie;class ht{constructor(t){this._mesh=new Et(ae,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,se)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}const at={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class oe extends W{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof N?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=ot.clone(t.uniforms),this.material=new N({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new ht(this.material)}render(t,e,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class yt extends W{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,s){const r=t.getContext(),a=t.state;a.buffers.color.setMask(!1),a.buffers.depth.setMask(!1),a.buffers.color.setLocked(!0),a.buffers.depth.setLocked(!0);let o,l;this.inverse?(o=0,l=1):(o=1,l=0),a.buffers.stencil.setTest(!0),a.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),a.buffers.stencil.setFunc(r.ALWAYS,o,4294967295),a.buffers.stencil.setClear(l),a.buffers.stencil.setLocked(!0),t.setRenderTarget(s),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),a.buffers.color.setLocked(!1),a.buffers.depth.setLocked(!1),a.buffers.color.setMask(!0),a.buffers.depth.setMask(!0),a.buffers.stencil.setLocked(!1),a.buffers.stencil.setFunc(r.EQUAL,1,4294967295),a.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),a.buffers.stencil.setLocked(!0)}}class re extends W{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class ne{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const s=t.getSize(new B);this._width=s.width,this._height=s.height,e=new st(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:it}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new oe(at),this.copyPass.material.blending=Nt,this.timer=new Dt}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());const e=this.renderer.getRenderTarget();let s=!1;for(let r=0,a=this.passes.length;r<a;r++){const o=this.passes[r];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,s),o.needsSwap){if(s){const l=this.renderer.getContext(),f=this.renderer.state.buffers.stencil;f.setFunc(l.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),f.setFunc(l.EQUAL,1,4294967295)}this.swapBuffers()}yt!==void 0&&(o instanceof yt?s=!0:o instanceof re&&(s=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new B);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const s=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(s,r),this.renderTarget2.setSize(s,r);for(let a=0;a<this.passes.length;a++)this.passes[a].setSize(s,r)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class le extends W{constructor(t,e,s=null,r=null,a=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=s,this.clearColor=r,this.clearAlpha=a,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new P}render(t,e,s){const r=t.autoClear;t.autoClear=!1;let a,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(a=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:s),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(a),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=r}}const he={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new P(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Q extends W{constructor(t,e=1,s,r){super(),this.strength=e,this.radius=s,this.threshold=r,this.resolution=t!==void 0?new B(t.x,t.y):new B(256,256),this.clearColor=new P(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new st(a,o,{type:it,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let m=0;m<this.nMips;m++){const b=new st(a,o,{type:it,depthBuffer:!1});b.texture.name="UnrealBloomPass.h"+m,b.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(b);const c=new st(a,o,{type:it,depthBuffer:!1});c.texture.name="UnrealBloomPass.v"+m,c.texture.generateMipmaps=!1,this.renderTargetsVertical.push(c),a=Math.round(a/2),o=Math.round(o/2)}const l=he;this.highPassUniforms=ot.clone(l.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new N({uniforms:this.highPassUniforms,vertexShader:l.vertexShader,fragmentShader:l.fragmentShader}),this.separableBlurMaterials=[];const f=[6,10,14,18,22];a=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let m=0;m<this.nMips;m++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(f[m])),this.separableBlurMaterials[m].uniforms.invSize.value=new B(1/a,1/o),a=Math.round(a/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const p=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=p,this.bloomTintColors=[new H(1,1,1),new H(1,1,1),new H(1,1,1),new H(1,1,1),new H(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=ot.clone(at.uniforms),this.blendMaterial=new N({uniforms:this.copyUniforms,vertexShader:at.vertexShader,fragmentShader:at.fragmentShader,premultipliedAlpha:!0,blending:lt,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new P,this._oldClearAlpha=1,this._basic=new Lt,this._fsQuad=new ht(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let s=Math.round(t/2),r=Math.round(e/2);this.renderTargetBright.setSize(s,r);for(let a=0;a<this.nMips;a++)this.renderTargetsHorizontal[a].setSize(s,r),this.renderTargetsVertical[a].setSize(s,r),this.separableBlurMaterials[a].uniforms.invSize.value=new B(1/s,1/r),s=Math.round(s/2),r=Math.round(r/2)}render(t,e,s,r,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=s.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=s.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let l=this.renderTargetBright;for(let f=0;f<this.nMips;f++)this._fsQuad.material=this.separableBlurMaterials[f],this.separableBlurMaterials[f].uniforms.colorTexture.value=l.texture,this.separableBlurMaterials[f].uniforms.direction.value=Q.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[f]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[f].uniforms.colorTexture.value=this.renderTargetsHorizontal[f].texture,this.separableBlurMaterials[f].uniforms.direction.value=Q.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[f]),t.clear(),this._fsQuad.render(t),l=this.renderTargetsVertical[f];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(s),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(t){const e=[],s=t/3;for(let o=0;o<t;o++)e.push(.39894*Math.exp(-.5*o*o/(s*s))/s);const r=[],a=[];for(let o=1;o<t;o+=2){const l=e[o],f=o+1<t?e[o+1]:0,p=l+f;r.push((o*l+(o+1)*f)/p),a.push(p)}return new N({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new B(.5,.5)},direction:{value:new B(.5,.5)},centerWeight:{value:e[0]},gaussianOffsets:{value:r},gaussianWeights:{value:a}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(t){return new N({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}Q.BlurDirectionX=new B(1,0);Q.BlurDirectionY=new B(0,1);const tt={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class ue extends W{constructor(){super(),this.isOutputPass=!0,this.uniforms=ot.clone(tt.uniforms),this.material=new It({name:tt.name,uniforms:this.uniforms,vertexShader:tt.vertexShader,fragmentShader:tt.fragmentShader}),this._fsQuad=new ht(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,s){this.uniforms.tDiffuse.value=s.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Ut.getTransfer(this._outputColorSpace)===Ot&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Gt?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===jt?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Kt?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ft?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Vt?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ht?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Qt&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const E=O.length,q=O.findIndex(u=>u.id==="checkin"),et={standby:{vorm:0,groei:.24,sat:.34,rot:.07,zwaai:.03,uit:.45,in:0,snel:.55,dicht:.3,vonk:.55,storm:0,scan:.75,plexus:.6,kracht:.95,kern:"#FF3B3B",kernKracht:.8,bloom:.5},listening:{vorm:1,groei:.82,sat:.9,rot:.08,zwaai:.06,uit:.1,in:1,snel:1.3,dicht:.85,vonk:.4,storm:0,scan:0,plexus:.8,kracht:1.05,kern:"#8FD3FF",kernKracht:1,bloom:.62},thinking:{vorm:1,groei:1,sat:1,rot:.26,zwaai:.1,uit:1,in:.9,snel:2.8,dicht:1,vonk:1,storm:1,scan:0,plexus:1,kracht:1.05,kern:"#C49BFF",kernKracht:1.25,bloom:.82},speaking:{vorm:1,groei:1,sat:1,rot:.12,zwaai:.08,uit:1,in:0,snel:1.7,dicht:1,vonk:.8,storm:.35,scan:0,plexus:.9,kracht:1.12,kern:"#FFB070",kernKracht:1.2,bloom:.76}},At={hoog:{cortex:7600,binnen:1800,kleine:1e3,stam:160,vezels:34,bogen:44,plexus:2600,stof:1400,segment:40,dpr:1.75},midden:{cortex:5200,binnen:1200,kleine:700,stam:110,vezels:24,bogen:30,plexus:1800,stof:900,segment:32,dpr:1.5},laag:{cortex:3e3,binnen:700,kleine:420,stam:60,vezels:11,bogen:18,plexus:900,stof:400,segment:24,dpr:1.25}},y=.8,kt=5.7;function ce(u){let t=u>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function fe(u){const t=(o,l,f)=>{let p=Math.imul(o,374761393)+Math.imul(l,668265263)+Math.imul(f,1440662683)+u|0;return p=Math.imul(p^p>>>13,1274126177),p^=p>>>16,(p>>>0)/4294967296},e=o=>o*o*(3-2*o),s=(o,l,f)=>o+(l-o)*f,r=(o,l,f)=>{const p=Math.floor(o),m=Math.floor(l),b=Math.floor(f),c=e(o-p),C=e(l-m),T=e(f-b),M=(D,Y,I)=>t(p+D,m+Y,b+I);return s(s(s(M(0,0,0),M(1,0,0),c),s(M(0,1,0),M(1,1,0),c),C),s(s(M(0,0,1),M(1,0,1),c),s(M(0,1,1),M(1,1,1),c),C),T)};return{ruis:r,richel:(o,l,f)=>{let p=0,m=.6,b=1,c=0;for(let C=0;C<3;C++){const T=1-Math.abs(r(o*b,l*b,f*b)*2-1);p+=T*T*m,c+=m,m*=.5,b*=2.03}return p/c}}}function V(u){const t=u()*2-1,e=u()*Math.PI*2,s=Math.sqrt(1-t*t);return[s*Math.cos(e),t,s*Math.sin(e)]}const j=u=>{const t=Math.hypot(u[0],u[1],u[2])||1;return[u[0]/t,u[1]/t,u[2]/t]};function nt(u,t,e,s=1){const r=u>=0?1:-1;let a=u*.6,o=t*.5,l=e*.8;o<0&&(o*=.7),a*=1-.12*Math.max(0,e),o*=1+.1*Math.max(0,-e);const f=Math.max(0,Math.abs(u)-.45)*Math.max(0,-t)*Math.max(0,e+.35);o-=f*.28,a+=r*f*.1;const p=Math.exp(-((u/.13)**2));return o-=p*.07*Math.max(0,t),a+=r*.03,[a*s,o*s+.04,l*s]}function Pt(u,t){const e=j(u);let s=0,r=-1/0;for(let a=0;a<t.length;a++){if(a===q)continue;const o=t[a],l=e[0]*o[0]+e[1]*o[1]+e[2]*o[2];l>r&&(r=l,s=a)}return s}function pe(u,t=7){const e=ce(t),{richel:s}=fe(t*13+1),r=O.map(i=>j(i.anker)),a=u.cortex+u.binnen+u.kleine+u.stam,o=new Float32Array(a*3),l=new Float32Array(a*3),f=new Float32Array(a),p=new Float32Array(a),m=new Float32Array(a),b=new Uint8Array(a);let c=0;const C=(i,n,h,v)=>{o.set(n,c*3),l.set(i,c*3),f[c]=h,p[c]=e(),m[c]=e()<.035?2.4+e()*1.4:.75+e()*.55,b[c]=v?1:0,c++};for(;c<u.cortex;){const i=V(e),n=nt(i[0],i[1],i[2],1),h=s(n[0]*7,n[1]*7,n[2]*7);if(e()>.08+.92*h*h*h)continue;const v=1+(e()-.5)*.025,d=1+(e()-.5)*.03;C([n[0]*v,n[1]*v,n[2]*v],[i[0]*y*d,i[1]*y*d,i[2]*y*d],Pt(n,r),!0)}for(let i=0;i<u.binnen;i++){const n=V(e),h=.25+Math.pow(e(),.6)*.68,v=nt(n[0],n[1],n[2],h);C(v,[n[0]*y*h,n[1]*y*h,n[2]*y*h],Pt(v,r),!1)}let T=0;for(;T<u.kleine;){const i=V(e),n=[i[0]*.4,-.27+i[1]*.16,-.5+i[2]*.25];if(n[2]>-.32||e()>.35+.65*(.5+.5*Math.sin(n[1]*95)))continue;const h=j(n);C(n,[h[0]*y*.97,h[1]*y*.97,h[2]*y*.97],q,!0),T++}for(let i=0;i<u.stam;i++){const n=e(),h=e()*Math.PI*2,v=.05+e()*.03,d=[Math.cos(h)*v,-.22-n*.42,-.16-n*.08+Math.sin(h)*v],x=j(d);C(d,[x[0]*y*.5*(1-n*.4),x[1]*y*.5,x[2]*y*.5],q,!1)}const M=.115,D=new Map,Y=(i,n,h)=>`${Math.floor(i/M)},${Math.floor(n/M)},${Math.floor(h/M)}`,I=[],$=Math.max(1,Math.floor(a/u.plexus));for(let i=0;i<a;i+=$){I.push(i);const n=Y(l[i*3],l[i*3+1],l[i*3+2]);D.has(n)||D.set(n,[]),D.get(n).push(i)}const A=[],F=new Set;for(const i of I){const n=l[i*3],h=l[i*3+1],v=l[i*3+2],d=Math.floor(n/M),x=Math.floor(h/M),R=Math.floor(v/M),S=[];for(let _=-1;_<=1;_++)for(let g=-1;g<=1;g++)for(let k=-1;k<=1;k++){const G=D.get(`${d+_},${x+g},${R+k}`);if(G)for(const Z of G){if(Z===i)continue;const Tt=Math.hypot(l[Z*3]-n,l[Z*3+1]-h,l[Z*3+2]-v);Tt<M&&S.push([Tt,Z])}}S.sort((_,g)=>_[0]-g[0]);for(let _=0;_<Math.min(2,S.length);_++){const g=S[_][1],k=i<g?`${i}-${g}`:`${g}-${i}`;F.has(k)||Math.hypot(o[g*3]-o[i*3],o[g*3+1]-o[i*3+1],o[g*3+2]-o[i*3+2])>.3||(F.add(k),A.push(i,g))}}const z=O.map(()=>[]);for(let i=0;i<u.cortex+u.binnen+u.kleine;i++)b[i]&&z[f[i]].push(i);const L=u.segment,X=[],ct=(i,n,h,v,d)=>{const x=1-d,R=x*x*x,S=3*x*x*d,_=3*x*d*d,g=d*d*d;return[R*i[0]+S*n[0]+_*h[0]+g*v[0],R*i[1]+S*n[1]+_*h[1]+g*v[1],R*i[2]+S*n[2]+_*h[2]+g*v[2]]},ft=(i,n)=>[i[1]*n[2]-i[2]*n[1],i[2]*n[0]-i[0]*n[2],i[0]*n[1]-i[1]*n[0]],pt=(i,n,h)=>{const v=Math.hypot(i[0],i[1],i[2]),d=j(i),x=j(ft(d,h.as)),R=j(ft(d,x)),S=[i[0]*.42+x[0]*h.k1,i[1]*.42+x[1]*h.k1,i[2]*.42+x[2]*h.k1],_=[i[0]*.98,i[1]*.98,i[2]*.98],g=v*h.lengte,k=[d[0]*g+R[0]*h.k2*g,d[1]*g+R[1]*h.k2*g,d[2]*g+R[2]*h.k2*g];return G=>ct(n,S,_,k,G)};for(let i=0;i<E;i++){const n=z[i];if(!n.length)continue;const h=i===q?Math.ceil(u.vezels*.6):u.vezels;for(let v=0;v<h;v++){const d=n[Math.floor(e()*n.length)],x=[l[d*3],l[d*3+1],l[d*3+2]],R=[o[d*3],o[d*3+1],o[d*3+2]],S=V(e),_=.1+e()*.26,g=[S[0]*_,S[1]*_*.7,S[2]*_],k={as:V(e),k1:(e()-.5)*.5,k2:(e()-.5)*.7,lengte:1.25+Math.pow(e(),1.5)*1.15};X.push({fb:pt(x,g,k),fs:pt(R,g,k),regio:i,rnd:e(),type:0})}}for(let i=0;i<u.bogen;i++){const n=Math.floor(e()*E);let h=Math.floor(e()*E);if(h===n&&(h=(h+1+Math.floor(e()*(E-1)))%E),!z[n].length||!z[h].length)continue;const v=z[n][Math.floor(e()*z[n].length)],d=z[h][Math.floor(e()*z[h].length)],x=R=>{const S=[R[v*3],R[v*3+1],R[v*3+2]],_=[R[d*3],R[d*3+1],R[d*3+2]],g=[S[0]*.3,S[1]*.3+.05,S[2]*.3],k=[_[0]*.3,_[1]*.3+.05,_[2]*.3];return G=>ct(S,g,k,_,G)};X.push({fb:x(l),fs:x(o),regio:n,rnd:e(),type:1})}const Bt=L+1,K=X.length*Bt,dt=new Float32Array(K*3),mt=new Float32Array(K*3),vt=new Float32Array(K),gt=new Float32Array(K),bt=new Float32Array(K),Mt=new Float32Array(K),rt=new Uint32Array(X.length*L*2);let U=0,_t=0;X.forEach(i=>{const n=U;for(let h=0;h<=L;h++){const v=h/L;mt.set(i.fb(v),U*3),dt.set(i.fs(v),U*3),vt[U]=v,gt[U]=i.regio,bt[U]=i.rnd,Mt[U]=i.type,U++}for(let h=0;h<L;h++)rt[_t++]=n+h,rt[_t++]=n+h+1});const xt=new Float32Array(u.stof*3),wt=new Float32Array(u.stof);for(let i=0;i<u.stof;i++){const n=V(e),h=4.5+e()*7;xt.set([n[0]*h,n[1]*h*.7,-3-Math.abs(n[2])*h],i*3),wt[i]=e()}return{punten:{bol:o,brein:l,regio:f,rnd:p,grootte:m,totaal:a},plexus:A,vezels:{vBol:dt,vBrein:mt,vT:vt,vRegio:gt,vRnd:bt,vType:Mt,vIndex:rt},stof:{stof:xt,stofRnd:wt},ankerBol:r.map(i=>[i[0]*y*1.04,i[1]*y*1.04,i[2]*y*1.04]),ankerBrein:r.map((i,n)=>n===q?[0,-.36,-.68]:nt(i[0],i[1],i[2],1.03))}}const ut=`
  uniform float uTijd;
  uniform float uVorm;
  uniform float uIntro;
  uniform float uSat;
  uniform float uNiveau;
  uniform float uFocus;
  uniform float uKracht;
  uniform float uRegio[${E}];
  uniform vec3 uKleur[${E}];
  uniform vec3 uParel;
  vec3 morph(vec3 bol, vec3 brein, float rnd) {
    float v = clamp(uVorm * 1.45 - rnd * 0.45, 0.0, 1.0);
    v = v * v * (3.0 - 2.0 * v);
    vec3 p = mix(bol, brein, v);
    float i = clamp(uIntro * 1.4 - rnd * 0.4, 0.0, 1.0);
    i = 1.0 - pow(1.0 - i, 4.0);
    return p * i;
  }
`,de=`
  ${ut}
  attribute vec3 aBol;
  attribute vec3 aBrein;
  attribute float aRegio;
  attribute float aRnd;
  attribute float aGrootte;
  uniform float uVonk;
  uniform float uSchaal;
  uniform float uAdem;
  uniform float uScan;
  varying vec3 vKleur;
  varying float vA;
  void main() {
    vec3 p = morph(aBol, aBrein, aRnd);
    float t = uTijd;
    p += 0.008 * vec3(sin(t * 0.7 + aRnd * 61.0), sin(t * 0.6 + aRnd * 37.0), cos(t * 0.8 + aRnd * 19.0));
    float golf = sin(t * 7.0 + aRnd * 40.0 + length(p) * 12.0);
    p *= 1.0 + uNiveau * 0.035 * golf + uAdem * 0.012;
    float scanY = sin(t * 0.38) * 0.95;
    float scan = exp(-pow((p.y - scanY) * 16.0, 2.0)) * uScan;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float diepte = -mv.z;
    int r = int(aRegio + 0.5);
    float g = uRegio[r];
    float flits = pow(max(0.0, sin(t * (0.35 + aRnd * 1.2) + aRnd * 311.0)), 90.0) * uVonk;
    float coc = abs(diepte - uFocus);
    float grootte = aGrootte * (1.0 + g * 0.9 + flits * 1.6 + scan * 0.6);
    gl_PointSize = grootte * uSchaal / diepte * (1.0 + coc / 0.8 * 0.9);
    coc /= 0.8;
    vA = uKracht * (0.15 + g * 0.8 + flits * 1.2 + scan * 0.9) / (1.0 + coc * coc * 1.8);
    vKleur = mix(uParel, uKleur[r], clamp(uSat + g * 0.6, 0.0, 1.0));
    vKleur = mix(vKleur, vec3(1.0), clamp(flits * 0.6 + scan * 0.3, 0.0, 1.0));
    gl_Position = projectionMatrix * mv;
  }
`,me=`
  varying vec3 vKleur;
  varying float vA;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float zacht = smoothstep(0.5, 0.0, d);
    float kern = smoothstep(0.2, 0.0, d);
    float a = min(1.25, (zacht * zacht * 0.55 + kern * 0.6) * vA);
    gl_FragColor = vec4(vKleur * a, 1.0);
  }
`,ve=`
  ${ut}
  attribute vec3 aBol;
  attribute vec3 aBrein;
  attribute float aRegio;
  attribute float aRnd;
  uniform float uPlexus;
  varying vec3 vKleur;
  varying float vA;
  void main() {
    vec3 p = morph(aBol, aBrein, aRnd);
    float t = uTijd;
    p += 0.008 * vec3(sin(t * 0.7 + aRnd * 61.0), sin(t * 0.6 + aRnd * 37.0), cos(t * 0.8 + aRnd * 19.0));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    int r = int(aRegio + 0.5);
    float g = uRegio[r];
    float coc = abs(-mv.z - uFocus) / 0.8;
    vA = uPlexus * uKracht * (0.07 + g * 0.3) / (1.0 + coc * coc * 1.6);
    vKleur = mix(uParel, uKleur[r], clamp(uSat + g * 0.6, 0.0, 1.0));
    gl_Position = projectionMatrix * mv;
  }
`,ge=`
  varying vec3 vKleur;
  varying float vA;
  void main() { gl_FragColor = vec4(vKleur * vA, 1.0); }
`,be=`
  ${ut}
  attribute vec3 aBol;
  attribute vec3 aBrein;
  attribute float aT;
  attribute float aRegio;
  attribute float aRnd;
  attribute float aType;
  uniform float uGroei;
  uniform float uZwaai;
  uniform float uDenk;
  varying vec3 vKleur;
  varying float vA;
  varying float vT;
  varying float vRnd;
  varying float vG;
  void main() {
    vec3 p = morph(aBol, aBrein, aRnd);
    float w = aType > 0.5 ? sin(aT * 3.14159) * 0.5 : aT * aT;
    float t = uTijd * 0.55;
    vec3 golf = vec3(
      sin(t * 1.3 + aRnd * 40.0 + aT * 3.2),
      cos(t * 1.1 + aRnd * 23.0 + aT * 2.6),
      sin(t * 0.9 + aRnd * 17.0 - aT * 2.2));
    p += golf * w * (uZwaai + uNiveau * 0.1);
    p += vec3(sin(uTijd * 21.0 + aRnd * 90.0 + aT * 18.0), cos(uTijd * 19.0 + aRnd * 50.0 + aT * 15.0), 0.0) * w * uNiveau * 0.025;
    int r = int(aRegio + 0.5);
    float g = uRegio[r];
    vG = g;
    vT = aT;
    vRnd = aRnd;
    vKleur = mix(uParel, uKleur[r], clamp(uSat + g * 0.6, 0.0, 1.0));
    float groei = clamp(uGroei * 1.35 - aRnd * 0.35, 0.0, 1.0);
    float zicht = aType > 0.5 ? uDenk * (0.3 + g * 1.2) : 1.0;
    vA = zicht * (1.0 - smoothstep(groei - 0.06, groei, aT)) * uKracht;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float coc = abs(-mv.z - uFocus) / 0.8;
    vA /= (1.0 + coc * coc * 1.2);
    gl_Position = projectionMatrix * mv;
  }
`,Me=`
  uniform float uTijd;
  uniform float uSnel;
  uniform float uUit;
  uniform float uIn;
  uniform float uDicht;
  varying vec3 vKleur;
  varying float vA;
  varying float vT;
  varying float vRnd;
  varying float vG;
  float komeet(float pos, float fase) {
    float d = pos - fase;
    return d < 0.0 ? exp(-d * d * 150.0) : exp(-d * d * 4200.0);
  }
  float hash(float x) { return fract(sin(x * 127.1) * 43758.5453); }
  void main() {
    float snel = uSnel * (0.55 + vRnd * 0.9) * (1.0 + vG * 1.2);
    float k1 = uTijd * snel * 0.22 + vRnd * 13.7;
    float k2 = uTijd * snel * 0.19 + vRnd * 29.3;
    float poort1 = step(hash(floor(k1) + vRnd * 71.0), uDicht + vG * 0.5);
    float poort2 = step(hash(floor(k2) + vRnd * 37.0), uDicht + vG * 0.5);
    float puls = komeet(vT, fract(k1)) * uUit * poort1 + komeet(1.0 - vT, fract(k2)) * uIn * poort2;
    float basis = 0.06 + 0.05 * (1.0 - vT) + vG * 0.25;
    float a = min(1.7, (basis + puls * (1.5 + vG * 2.0)) * vA) * smoothstep(0.0, 0.14, vT);
    gl_FragColor = vec4(vKleur * a, 1.0);
  }
`,_e=`
  attribute float aRnd;
  uniform float uTijd;
  uniform float uSchaal;
  varying float vA;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = (0.6 + aRnd * 1.4) * uSchaal / -mv.z;
    vA = (0.18 + 0.5 * pow(max(0.0, sin(uTijd * (0.2 + aRnd * 0.6) + aRnd * 50.0)), 6.0)) * (0.4 + aRnd * 0.6);
    gl_Position = projectionMatrix * mv;
  }
`,xe=`
  varying float vA;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(vec3(0.72, 0.78, 0.95) * smoothstep(0.5, 0.0, d) * vA, 1.0);
  }
`;class Te{constructor(t,e={}){this.canvas=t,this.opties={kwaliteit:"hoog",auto:!0,interactief:!0,transparant:!1,achtergrond:"#1E1A2A",seed:7,middenY:0,zoom:1,...e},this.q=At[this.opties.kwaliteit]||At.hoog,this.verminderd=typeof window<"u"&&!!window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,this.tijd=0,this.status="standby",this.doel={...et.standby},this.p={...et.standby,groei:0,intro:0,niveau:0,adem:0},this.kernKleur=new P(this.doel.kern),this.kernDoel=new P(this.doel.kern),this.piek=new Float32Array(E),this.focusSet=new Set,this.niveauIn=0,this.stormKlok=0,this.rotY=-.55,this.rotV=0,this.kantel=0,this.muis={x:0,y:0,sx:0,sy:0,neer:!1,lx:0,ly:0},this._raf=0,this._laatst=0,this._loopt=!1,this._v3=new H,this._bouwRenderer(),this._bouwScene(),this._koppel(),this._resize(),this.opties.auto&&this.start()}setStatus(t){!et[t]||t===this.status||(this.status=t,this.doel={...et[t]},this.kernDoel.set(this.doel.kern))}setNiveau(t){this.niveauIn=Math.max(0,Math.min(1,t||0))}vuur(t,e=1){const s=typeof t=="number"?t:O.findIndex(r=>r.id===t);s>=0&&(this.piek[s]=Math.max(this.piek[s],Math.min(1.4,e)))}setFocus(t=[]){this.focusSet=new Set(t)}ankers(){const t=this.breedte,e=this.hoogte,s=this._vormGlad();return O.map((r,a)=>{const o=this.data.ankerBrein[a],l=this.data.ankerBol[a],f=Math.max(0,Math.min(1,this.p.intro*1.4-.2)),p=1-Math.pow(1-f,4);this._v3.set((l[0]+(o[0]-l[0])*s)*p,(l[1]+(o[1]-l[1])*s)*p,(l[2]+(o[2]-l[2])*s)*p),this._v3.applyMatrix4(this.groep.matrixWorld);const m=this._v3.z;this._v3.project(this.camera);const b=Math.max(0,Math.min(1,.5+m*.9));return{id:r.id,label:r.label,kleur:r.kleur,index:a,x:(this._v3.x*.5+.5)*t,y:(-this._v3.y*.5+.5)*e,voor:b,gloed:this.uniforms.uRegio.value[a]}})}kader(){this._v3.set(0,0,0).applyMatrix4(this.groep.matrixWorld).project(this.camera);const t=(this._v3.x*.5+.5)*this.breedte,e=(-this._v3.y*.5+.5)*this.hoogte,s=Math.tan(Wt.degToRad(this.camera.fov/2))*this._afstand(),r=y/s*(this.hoogte/2);return{cx:t,cy:e,straal:r}}start(){if(this._loopt)return;this._loopt=!0,this._laatst=performance.now();const t=e=>{if(!this._loopt)return;const s=Math.min(.05,(e-this._laatst)/1e3);this._laatst=e,this.stap(s),this._raf=requestAnimationFrame(t)};this._raf=requestAnimationFrame(t)}stop(){this._loopt=!1,cancelAnimationFrame(this._raf)}stap(t){const e=this.verminderd?t*.25:t;this.tijd+=e,this._update(t,e),this.composer.render(t),this.opties.onFrame&&this.opties.onFrame(this)}dispose(){this.stop(),this._ontkoppel(),this.scene.traverse(t=>{t.geometry&&t.geometry.dispose(),t.material&&(t.material.map&&t.material.map.dispose(),t.material.dispose())}),this.composer.dispose&&this.composer.dispose(),this.bloom.dispose&&this.bloom.dispose(),this.renderer.dispose()}_afstand(){return kt/(this.opties.zoom||1)}_bouwRenderer(){const t=new Yt({canvas:this.canvas,antialias:!1,alpha:this.opties.transparant,powerPreference:"high-performance"});t.setClearColor(new P(this.opties.achtergrond),this.opties.transparant?0:1),t.toneMapping=Ft,t.toneMappingExposure=1,this.renderer=t,this.scene=new $t,this.camera=new Xt(35,1,.1,60),this.camera.position.set(0,0,this._afstand()),this.composer=new ne(t),this.opties.transparant||(this.scene.background=new P(this.opties.achtergrond)),this.composer.addPass(new le(this.scene,this.camera)),this.bloom=new Q(new B(1024,1024),.6,0,.34),this.bloom.compositeMaterial&&(this.bloom.compositeMaterial.uniforms.bloomFactors.value=[1,.72,.42,.16,.04]),this.composer.addPass(this.bloom),this.composer.addPass(new ue)}_bouwScene(){const t=this.data=pe(this.q,this.opties.seed),e=this.uniforms={uTijd:{value:0},uVorm:{value:0},uIntro:{value:0},uSat:{value:this.p.sat},uNiveau:{value:0},uFocus:{value:kt},uKracht:{value:1},uRegio:{value:new Array(E).fill(0)},uKleur:{value:O.map(A=>new P(A.kleur))},uParel:{value:new P("#F4EFE6")},uSchaal:{value:8}},s={transparent:!0,depthWrite:!1,depthTest:!1,blending:lt};this.groep=new Zt,this.scene.add(this.groep);const r=new J;r.setAttribute("position",new w(t.punten.brein,3)),r.setAttribute("aBol",new w(t.punten.bol,3)),r.setAttribute("aBrein",new w(t.punten.brein,3)),r.setAttribute("aRegio",new w(t.punten.regio,1)),r.setAttribute("aRnd",new w(t.punten.rnd,1)),r.setAttribute("aGrootte",new w(t.punten.grootte,1)),this.puntMat=new N({...s,uniforms:{...e,uVonk:{value:.5},uAdem:{value:0},uScan:{value:0}},vertexShader:de,fragmentShader:me});const a=new Ct(r,this.puntMat);a.frustumCulled=!1,this.groep.add(a);const o=t.plexus,l=o.length,f=new Float32Array(l*3),p=new Float32Array(l*3),m=new Float32Array(l),b=new Float32Array(l);for(let A=0;A<l;A++){const F=o[A];f.set(t.punten.bol.subarray(F*3,F*3+3),A*3),p.set(t.punten.brein.subarray(F*3,F*3+3),A*3),m[A]=t.punten.regio[F],b[A]=t.punten.rnd[F]}const c=new J;c.setAttribute("position",new w(p,3)),c.setAttribute("aBol",new w(f,3)),c.setAttribute("aBrein",new w(p,3)),c.setAttribute("aRegio",new w(m,1)),c.setAttribute("aRnd",new w(b,1)),this.plexusMat=new N({...s,uniforms:{...e,uPlexus:{value:.6}},vertexShader:ve,fragmentShader:ge});const C=new Rt(c,this.plexusMat);C.frustumCulled=!1,this.groep.add(C);const T=t.vezels,M=new J;M.setAttribute("position",new w(T.vBrein,3)),M.setAttribute("aBol",new w(T.vBol,3)),M.setAttribute("aBrein",new w(T.vBrein,3)),M.setAttribute("aT",new w(T.vT,1)),M.setAttribute("aRegio",new w(T.vRegio,1)),M.setAttribute("aRnd",new w(T.vRnd,1)),M.setAttribute("aType",new w(T.vType,1)),M.setIndex(new w(T.vIndex,1)),this.vezelMat=new N({...s,uniforms:{...e,uGroei:{value:0},uZwaai:{value:.03},uDenk:{value:0},uSnel:{value:.6},uUit:{value:.4},uIn:{value:0},uDicht:{value:.3}},vertexShader:be,fragmentShader:Me});const D=new Rt(M,this.vezelMat);D.frustumCulled=!1,this.groep.add(D);const Y=this._gloedTextuur(),I=(A,F,z)=>{const L=new te(new ee({map:Y,color:F,transparent:!0,opacity:z,depthWrite:!1,depthTest:!1,blending:lt}));return L.scale.setScalar(A),this.groep.add(L),L};this.kernHalo=I(1.7,new P(this.doel.kern),.1),this.kernCorona=I(.4,new P(this.doel.kern),.5),this.kernHart=I(.1,new P("#ffffff"),.9);const $=new J;$.setAttribute("position",new w(t.stof.stof,3)),$.setAttribute("aRnd",new w(t.stof.stofRnd,1)),this.stofMat=new N({...s,uniforms:{uTijd:e.uTijd,uSchaal:e.uSchaal},vertexShader:_e,fragmentShader:xe}),this.stof=new Ct($,this.stofMat),this.stof.frustumCulled=!1,this.scene.add(this.stof)}_gloedTextuur(){const t=document.createElement("canvas");t.width=t.height=128;const e=t.getContext("2d"),s=e.createRadialGradient(64,64,0,64,64,64);s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(.18,"rgba(255,255,255,.55)"),s.addColorStop(.45,"rgba(255,255,255,.14)"),s.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=s,e.fillRect(0,0,128,128);const r=new Jt(t);return r.colorSpace=qt,r}_vormGlad(){const t=Math.max(0,Math.min(1,this.p.vorm));return t*t*(3-2*t)}_update(t,e){const s=this.p,r=this.doel,a=c=>1-Math.exp(-t*c);for(const c of["sat","rot","zwaai","uit","in","snel","dicht","vonk","storm","scan","plexus","kracht","kernKracht","bloom"])s[c]+=(r[c]-s[c])*a(2.4);s.vorm+=(r.vorm-s.vorm)*a(1.5),s.groei+=(r.groei-s.groei)*a(r.groei>s.groei?1.6:2.6),s.intro=Math.min(1,s.intro+t/1.8),this.kernKleur.lerp(this.kernDoel,a(3));const o=this.opties.niveau?this.opties.niveau():this.niveauIn;if(s.niveau+=(o-s.niveau)*a(o>s.niveau?18:5),s.adem=.5+.5*Math.sin(this.tijd*.9),s.storm>.5&&!this.verminderd&&(this.stormKlok-=t,this.stormKlok<=0)){const c=s.storm>.8?2+(Math.random()<.5?1:0):1;for(let C=0;C<c;C+=1)this.vuur(Math.floor(Math.random()*E),(.55+Math.random()*.5)*s.storm);this.stormKlok=(.05+Math.random()*.1)/Math.max(.5,s.storm)}const l=this.uniforms.uRegio.value;for(let c=0;c<E;c++){this.piek[c]*=Math.exp(-t*1.5);const C=this.focusSet.has(O[c].id)?.6+.08*Math.sin(this.tijd*3+c):0,T=Math.max(this.piek[c],C);l[c]+=(T-l[c])*a(T>l[c]?10:3)}this.muis.neer||(this.rotY+=(s.rot+this.rotV)*e,this.rotV*=Math.exp(-t*2.2),this.kantel*=Math.exp(-t*1.2)),this.groep.rotation.set(.24+Math.sin(this.tijd*.13)*.05+this.kantel,this.rotY,Math.sin(this.tijd*.09)*.03),this.muis.sx+=(this.muis.x-this.muis.sx)*a(2),this.muis.sy+=(this.muis.y-this.muis.sy)*a(2);const f=-this.opties.middenY;this.camera.position.set(this.muis.sx*.18,f-this.muis.sy*.12,this._afstand()),this.camera.lookAt(0,f,0),this.stof.rotation.y=-this.tijd*.012,this.stof.rotation.x=Math.sin(this.tijd*.05)*.04;const p=s.kernKracht*(1+s.niveau*.9+s.adem*.08);this.kernHart.scale.setScalar(.09*(1+s.niveau*.8+s.adem*.06)*(1-s.vorm*.25)),this.kernCorona.scale.setScalar(.36*(1+s.niveau*.6)*(1-s.vorm*.2)),this.kernHalo.scale.setScalar(1.5+s.niveau*.4),this.kernCorona.material.color.copy(this.kernKleur),this.kernHalo.material.color.copy(this.kernKleur),this.kernCorona.material.opacity=.45*p*Math.min(1,s.intro*2),this.kernHalo.material.opacity=.09*p*Math.min(1,s.intro*2),this.kernHart.material.opacity=.9*Math.min(1,s.intro*2);const m=this.uniforms;m.uTijd.value=this.tijd,m.uVorm.value=s.vorm,m.uIntro.value=s.intro,m.uSat.value=s.sat,m.uNiveau.value=s.niveau,m.uKracht.value=s.kracht,m.uFocus.value=this.camera.position.length(),this.puntMat.uniforms.uVonk.value=s.vonk,this.puntMat.uniforms.uAdem.value=s.adem,this.puntMat.uniforms.uScan.value=s.scan,this.plexusMat.uniforms.uPlexus.value=s.plexus;const b=this.vezelMat.uniforms;b.uGroei.value=s.groei,b.uZwaai.value=s.zwaai,b.uDenk.value=s.storm,b.uSnel.value=s.snel,b.uUit.value=s.uit,b.uIn.value=s.in,b.uDicht.value=s.dicht,this.bloom.strength=s.bloom}_resize(){const t=Math.max(1,this.canvas.clientWidth||this.canvas.width||300),e=Math.max(1,this.canvas.clientHeight||this.canvas.height||300),s=Math.min(typeof window<"u"&&window.devicePixelRatio||1,this.opties.dpr||this.q.dpr);this.breedte=t,this.hoogte=e,this.renderer.setPixelRatio(s),this.renderer.setSize(t,e,!1),this.composer.setPixelRatio(s),this.composer.setSize(t,e),this.bloom.setSize(t*s,e*s),this.camera.aspect=t/e,this.camera.fov=t/e<.8?42:35,this.camera.updateProjectionMatrix(),this.uniforms.uSchaal.value=.019*e*s}_koppel(){if(this._opResize=()=>this._resize(),typeof ResizeObserver<"u"?(this._ro=new ResizeObserver(this._opResize),this._ro.observe(this.canvas)):window.addEventListener("resize",this._opResize),this._opZicht=()=>{document.hidden?(this._wasLopend=this._loopt,this.stop()):this._wasLopend&&this.start()},document.addEventListener("visibilitychange",this._opZicht),!this.opties.interactief)return;const t=this.canvas;this._opBeweeg=e=>{const s=t.getBoundingClientRect();if(this.muis.x=(e.clientX-s.left)/s.width*2-1,this.muis.y=(e.clientY-s.top)/s.height*2-1,this.muis.neer){const r=e.clientX-this.muis.lx,a=e.clientY-this.muis.ly;this.rotY+=r*.0055,this.kantel=Math.max(-.6,Math.min(.6,this.kantel+a*.004)),this.rotV=r*.08,this.muis.lx=e.clientX,this.muis.ly=e.clientY}},this._opNeer=e=>{this.muis.neer=!0,this.muis.lx=e.clientX,this.muis.ly=e.clientY,t.setPointerCapture&&t.setPointerCapture(e.pointerId),t.style.cursor="grabbing"},this._opOp=()=>{this.muis.neer=!1,t.style.cursor="grab"},this._opWeg=()=>{this.muis.x=0,this.muis.y=0},t.style.cursor="grab",t.style.touchAction="none",t.addEventListener("pointermove",this._opBeweeg),t.addEventListener("pointerdown",this._opNeer),t.addEventListener("pointerup",this._opOp),t.addEventListener("pointercancel",this._opOp),t.addEventListener("pointerleave",this._opWeg)}_ontkoppel(){this._ro?this._ro.disconnect():window.removeEventListener("resize",this._opResize),document.removeEventListener("visibilitychange",this._opZicht);const t=this.canvas;this._opBeweeg&&(t.removeEventListener("pointermove",this._opBeweeg),t.removeEventListener("pointerdown",this._opNeer),t.removeEventListener("pointerup",this._opOp),t.removeEventListener("pointercancel",this._opOp),t.removeEventListener("pointerleave",this._opWeg))}}export{O as BREIN_REGIOS,et as BREIN_TOESTANDEN,Te as default};
