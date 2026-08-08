(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const So="169",bh=0,Qo=1,Eh=2,Ec=1,wc=2,bn=3,Tn=0,Ue=1,xe=2,Vn=0,Ui=1,he=2,tl=3,el=4,wh=5,ii=100,Ah=101,Th=102,Rh=103,Ch=104,Ph=200,Lh=201,Ih=202,Dh=203,Ra=204,Ca=205,Nh=206,Uh=207,Fh=208,Oh=209,Bh=210,kh=211,Gh=212,Hh=213,zh=214,Pa=0,La=1,Ia=2,ki=3,Da=4,Na=5,Ua=6,Fa=7,Ac=0,Vh=1,Wh=2,Wn=0,Xh=1,Yh=2,qh=3,Tc=4,Kh=5,jh=6,$h=7,nl="attached",Jh="detached",Rc=300,Gi=301,Hi=302,Oa=303,Ba=304,Cr=306,Xn=1e3,Hn=1001,xr=1002,Ie=1003,Cc=1004,fs=1005,ze=1006,ur=1007,wn=1008,Rn=1009,Pc=1010,Lc=1011,Ms=1012,bo=1013,li=1014,rn=1015,Ts=1016,Eo=1017,wo=1018,zi=1020,Ic=35902,Dc=1021,Nc=1022,Ke=1023,Uc=1024,Fc=1025,Fi=1026,Vi=1027,Ao=1028,To=1029,Oc=1030,Ro=1031,Co=1033,dr=33776,fr=33777,pr=33778,mr=33779,ka=35840,Ga=35841,Ha=35842,za=35843,Va=36196,Wa=37492,Xa=37496,Ya=37808,qa=37809,Ka=37810,ja=37811,$a=37812,Ja=37813,Za=37814,Qa=37815,to=37816,eo=37817,no=37818,io=37819,so=37820,ro=37821,gr=36492,ao=36494,oo=36495,Bc=36283,lo=36284,co=36285,ho=36286,kc=2200,Gc=2201,Zh=2202,Ss=2300,bs=2301,kr=2302,Ii=2400,Di=2401,yr=2402,Po=2500,Qh=2501,tu=0,Hc=1,uo=2,eu=3200,nu=3201,zc=0,iu=1,kn="",fe="srgb",Ae="srgb-linear",Lo="display-p3",Pr="display-p3-linear",Mr="linear",ue="srgb",Sr="rec709",br="p3",di=7680,il=519,su=512,ru=513,au=514,Vc=515,ou=516,lu=517,cu=518,hu=519,fo=35044,sl="300 es",An=2e3,Er=2001;class hi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,t);t.target=null}}}const Te=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let rl=1234567;const gs=Math.PI/180,Wi=180/Math.PI;function an(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Te[r&255]+Te[r>>8&255]+Te[r>>16&255]+Te[r>>24&255]+"-"+Te[t&255]+Te[t>>8&255]+"-"+Te[t>>16&15|64]+Te[t>>24&255]+"-"+Te[e&63|128]+Te[e>>8&255]+"-"+Te[e>>16&255]+Te[e>>24&255]+Te[n&255]+Te[n>>8&255]+Te[n>>16&255]+Te[n>>24&255]).toLowerCase()}function Ee(r,t,e){return Math.max(t,Math.min(e,r))}function Io(r,t){return(r%t+t)%t}function uu(r,t,e,n,i){return n+(r-t)*(i-n)/(e-t)}function du(r,t,e){return r!==t?(e-r)/(t-r):0}function _s(r,t,e){return(1-e)*r+e*t}function fu(r,t,e,n){return _s(r,t,1-Math.exp(-e*n))}function pu(r,t=1){return t-Math.abs(Io(r,t*2)-t)}function mu(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*(3-2*r))}function gu(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*r*(r*(r*6-15)+10))}function _u(r,t){return r+Math.floor(Math.random()*(t-r+1))}function vu(r,t){return r+Math.random()*(t-r)}function xu(r){return r*(.5-Math.random())}function yu(r){r!==void 0&&(rl=r);let t=rl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Mu(r){return r*gs}function Su(r){return r*Wi}function bu(r){return(r&r-1)===0&&r!==0}function Eu(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function wu(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Au(r,t,e,n,i){const s=Math.cos,a=Math.sin,o=s(e/2),l=a(e/2),c=s((t+n)/2),h=a((t+n)/2),u=s((t-n)/2),d=a((t-n)/2),f=s((n-t)/2),g=a((n-t)/2);switch(i){case"XYX":r.set(o*h,l*u,l*d,o*c);break;case"YZY":r.set(l*d,o*h,l*u,o*c);break;case"ZXZ":r.set(l*u,l*d,o*h,o*c);break;case"XZX":r.set(o*h,l*g,l*f,o*c);break;case"YXY":r.set(l*f,o*h,l*g,o*c);break;case"ZYZ":r.set(l*g,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function sn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ie(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Q={DEG2RAD:gs,RAD2DEG:Wi,generateUUID:an,clamp:Ee,euclideanModulo:Io,mapLinear:uu,inverseLerp:du,lerp:_s,damp:fu,pingpong:pu,smoothstep:mu,smootherstep:gu,randInt:_u,randFloat:vu,randFloatSpread:xu,seededRandom:yu,degToRad:Mu,radToDeg:Su,isPowerOfTwo:bu,ceilPowerOfTwo:Eu,floorPowerOfTwo:wu,setQuaternionFromProperEuler:Au,normalize:ie,denormalize:sn};class ft{constructor(t=0,e=0){ft.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*i+t.x,this.y=s*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ot{constructor(t,e,n,i,s,a,o,l,c){Ot.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,a,o,l,c)}set(t,e,n,i,s,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=i[0],p=i[3],m=i[6],y=i[1],x=i[4],M=i[7],C=i[2],T=i[5],w=i[8];return s[0]=a*_+o*y+l*C,s[3]=a*p+o*x+l*T,s[6]=a*m+o*M+l*w,s[1]=c*_+h*y+u*C,s[4]=c*p+h*x+u*T,s[7]=c*m+h*M+u*w,s[2]=d*_+f*y+g*C,s[5]=d*p+f*x+g*T,s[8]=d*m+f*M+g*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*s*h+n*o*l+i*s*c-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,d=o*l-h*s,f=c*s-a*l,g=e*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(i*c-h*n)*_,t[2]=(o*n-i*a)*_,t[3]=d*_,t[4]=(h*e-i*l)*_,t[5]=(i*s-o*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Gr.makeScale(t,e)),this}rotate(t){return this.premultiply(Gr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Gr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Gr=new Ot;function Wc(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Es(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Tu(){const r=Es("canvas");return r.style.display="block",r}const al={};function _r(r){r in al||(al[r]=!0,console.warn(r))}function Ru(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function Cu(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Pu(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ol=new Ot().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ll=new Ot().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Qi={[Ae]:{transfer:Mr,primaries:Sr,luminanceCoefficients:[.2126,.7152,.0722],toReference:r=>r,fromReference:r=>r},[fe]:{transfer:ue,primaries:Sr,luminanceCoefficients:[.2126,.7152,.0722],toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[Pr]:{transfer:Mr,primaries:br,luminanceCoefficients:[.2289,.6917,.0793],toReference:r=>r.applyMatrix3(ll),fromReference:r=>r.applyMatrix3(ol)},[Lo]:{transfer:ue,primaries:br,luminanceCoefficients:[.2289,.6917,.0793],toReference:r=>r.convertSRGBToLinear().applyMatrix3(ll),fromReference:r=>r.applyMatrix3(ol).convertLinearToSRGB()}},Lu=new Set([Ae,Pr]),Kt={enabled:!0,_workingColorSpace:Ae,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!Lu.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,t,e){if(this.enabled===!1||t===e||!t||!e)return r;const n=Qi[t].toReference,i=Qi[e].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,t){return this.convert(r,this._workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this._workingColorSpace)},getPrimaries:function(r){return Qi[r].primaries},getTransfer:function(r){return r===kn?Mr:Qi[r].transfer},getLuminanceCoefficients:function(r,t=this._workingColorSpace){return r.fromArray(Qi[t].luminanceCoefficients)}};function Oi(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Hr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let fi;class Iu{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{fi===void 0&&(fi=Es("canvas")),fi.width=t.width,fi.height=t.height;const n=fi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=fi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Es("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Oi(s[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Oi(e[n]/255)*255):e[n]=Oi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Du=0;class Xc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Du++}),this.uuid=an(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(zr(i[a].image)):s.push(zr(i[a]))}else s=zr(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function zr(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Iu.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Nu=0;class ye extends hi{constructor(t=ye.DEFAULT_IMAGE,e=ye.DEFAULT_MAPPING,n=Hn,i=Hn,s=ze,a=wn,o=Ke,l=Rn,c=ye.DEFAULT_ANISOTROPY,h=kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Nu++}),this.uuid=an(),this.name="",this.source=new Xc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ft(0,0),this.repeat=new ft(1,1),this.center=new ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Rc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Xn:t.x=t.x-Math.floor(t.x);break;case Hn:t.x=t.x<0?0:1;break;case xr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Xn:t.y=t.y-Math.floor(t.y);break;case Hn:t.y=t.y<0?0:1;break;case xr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ye.DEFAULT_IMAGE=null;ye.DEFAULT_MAPPING=Rc;ye.DEFAULT_ANISOTROPY=1;class Jt{constructor(t=0,e=0,n=0,i=1){Jt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],_=l[2],p=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,M=(f+1)/2,C=(m+1)/2,T=(h+d)/4,w=(u+_)/4,P=(g+p)/4;return x>M&&x>C?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=T/n,s=w/n):M>C?M<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(M),n=T/i,s=P/i):C<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(C),n=w/s,i=P/s),this.set(n,i,s,e),this}let y=Math.sqrt((p-g)*(p-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(u-_)/y,this.z=(d-h)/y,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Uu extends hi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Jt(0,0,t,e),this.scissorTest=!1,this.viewport=new Jt(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ze,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new ye(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Xc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ci extends Uu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Yc extends ye{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ie,this.minFilter=Ie,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Fu extends ye{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ie,this.minFilter=Ie,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class on{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=s[a+0],f=s[a+1],g=s[a+2],_=s[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==d||c!==f||h!==g){let p=1-o;const m=l*d+c*f+h*g+u*_,y=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const C=Math.sqrt(x),T=Math.atan2(C,m*y);p=Math.sin(p*T)/C,o=Math.sin(o*T)/C}const M=o*y;if(l=l*p+d*M,c=c*p+f*M,h=h*p+g*M,u=u*p+_*M,p===1-o){const C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[a],d=s[a+1],f=s[a+2],g=s[a+3];return t[e]=o*g+h*u+l*f-c*d,t[e+1]=l*g+h*d+c*u-o*f,t[e+2]=c*g+h*f+o*d-l*u,t[e+3]=h*g-o*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(s/2),d=l(n/2),f=l(i/2),g=l(s/2);switch(a){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(s-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ee(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-s*l,this._y=i*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class A{constructor(t=0,e=0,n=0){A.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(cl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(cl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-s*i),u=2*(s*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-s*u,this.z=i+l*u+s*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Vr.copy(this).projectOnVector(t),this.sub(Vr)}reflect(t){return this.sub(Vr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Vr=new A,cl=new on;class je{constructor(t=new A(1/0,1/0,1/0),e=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Je.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Je.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Je.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Je):Je.fromBufferAttribute(s,a),Je.applyMatrix4(t.matrixWorld),this.expandByPoint(Je);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ns.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ns.copy(n.boundingBox)),Ns.applyMatrix4(t.matrixWorld),this.union(Ns)}const i=t.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Je),Je.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ts),Us.subVectors(this.max,ts),pi.subVectors(t.a,ts),mi.subVectors(t.b,ts),gi.subVectors(t.c,ts),Ln.subVectors(mi,pi),In.subVectors(gi,mi),jn.subVectors(pi,gi);let e=[0,-Ln.z,Ln.y,0,-In.z,In.y,0,-jn.z,jn.y,Ln.z,0,-Ln.x,In.z,0,-In.x,jn.z,0,-jn.x,-Ln.y,Ln.x,0,-In.y,In.x,0,-jn.y,jn.x,0];return!Wr(e,pi,mi,gi,Us)||(e=[1,0,0,0,1,0,0,0,1],!Wr(e,pi,mi,gi,Us))?!1:(Fs.crossVectors(Ln,In),e=[Fs.x,Fs.y,Fs.z],Wr(e,pi,mi,gi,Us))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Je).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Je).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(_n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),_n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),_n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),_n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),_n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),_n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),_n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),_n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(_n),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const _n=[new A,new A,new A,new A,new A,new A,new A,new A],Je=new A,Ns=new je,pi=new A,mi=new A,gi=new A,Ln=new A,In=new A,jn=new A,ts=new A,Us=new A,Fs=new A,$n=new A;function Wr(r,t,e,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){$n.fromArray(r,s);const o=i.x*Math.abs($n.x)+i.y*Math.abs($n.y)+i.z*Math.abs($n.z),l=t.dot($n),c=e.dot($n),h=n.dot($n);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Ou=new je,es=new A,Xr=new A;class fn{constructor(t=new A,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Ou.setFromPoints(t).getCenter(n);let i=0;for(let s=0,a=t.length;s<a;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;es.subVectors(t,this.center);const e=es.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(es,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Xr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(es.copy(t.center).add(Xr)),this.expandByPoint(es.copy(t.center).sub(Xr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const vn=new A,Yr=new A,Os=new A,Dn=new A,qr=new A,Bs=new A,Kr=new A;class Rs{constructor(t=new A,e=new A(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,vn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=vn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(vn.copy(this.origin).addScaledVector(this.direction,e),vn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Yr.copy(t).add(e).multiplyScalar(.5),Os.copy(e).sub(t).normalize(),Dn.copy(this.origin).sub(Yr);const s=t.distanceTo(e)*.5,a=-this.direction.dot(Os),o=Dn.dot(this.direction),l=-Dn.dot(Os),c=Dn.lengthSq(),h=Math.abs(1-a*a);let u,d,f,g;if(h>0)if(u=a*l-o,d=a*o-l,g=s*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Yr).addScaledVector(Os,d),f}intersectSphere(t,e){vn.subVectors(t.center,this.origin);const n=vn.dot(this.direction),i=vn.dot(vn)-n*n,s=t.radius*t.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(s=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,vn)!==null}intersectTriangle(t,e,n,i,s){qr.subVectors(e,t),Bs.subVectors(n,t),Kr.crossVectors(qr,Bs);let a=this.direction.dot(Kr),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Dn.subVectors(this.origin,t);const l=o*this.direction.dot(Bs.crossVectors(Dn,Bs));if(l<0)return null;const c=o*this.direction.dot(qr.cross(Dn));if(c<0||l+c>a)return null;const h=-o*Dn.dot(Kr);return h<0?null:this.at(h/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Nt{constructor(t,e,n,i,s,a,o,l,c,h,u,d,f,g,_,p){Nt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,a,o,l,c,h,u,d,f,g,_,p)}set(t,e,n,i,s,a,o,l,c,h,u,d,f,g,_,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Nt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/_i.setFromMatrixColumn(t,0).length(),s=1/_i.setFromMatrixColumn(t,1).length(),a=1/_i.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const d=a*h,f=a*u,g=o*h,_=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+g*c,e[5]=d-_*c,e[9]=-o*l,e[2]=_-d*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,g=c*h,_=c*u;e[0]=d+_*o,e[4]=g*o-f,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=_+d*o,e[10]=a*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,g=c*h,_=c*u;e[0]=d-_*o,e[4]=-a*u,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=_-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const d=a*h,f=a*u,g=o*h,_=o*u;e[0]=l*h,e[4]=g*c-f,e[8]=d*c+_,e[1]=l*u,e[5]=_*c+d,e[9]=f*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const d=a*l,f=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=_-d*u,e[8]=g*u+f,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*u+g,e[10]=d-_*u}else if(t.order==="XZY"){const d=a*l,f=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+_,e[5]=a*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=o*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Bu,t,ku)}lookAt(t,e,n){const i=this.elements;return ke.subVectors(t,e),ke.lengthSq()===0&&(ke.z=1),ke.normalize(),Nn.crossVectors(n,ke),Nn.lengthSq()===0&&(Math.abs(n.z)===1?ke.x+=1e-4:ke.z+=1e-4,ke.normalize(),Nn.crossVectors(n,ke)),Nn.normalize(),ks.crossVectors(ke,Nn),i[0]=Nn.x,i[4]=ks.x,i[8]=ke.x,i[1]=Nn.y,i[5]=ks.y,i[9]=ke.y,i[2]=Nn.z,i[6]=ks.z,i[10]=ke.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],p=n[10],m=n[14],y=n[3],x=n[7],M=n[11],C=n[15],T=i[0],w=i[4],P=i[8],U=i[12],v=i[1],b=i[5],F=i[9],O=i[13],V=i[2],X=i[6],z=i[10],J=i[14],W=i[3],at=i[7],ot=i[11],pt=i[15];return s[0]=a*T+o*v+l*V+c*W,s[4]=a*w+o*b+l*X+c*at,s[8]=a*P+o*F+l*z+c*ot,s[12]=a*U+o*O+l*J+c*pt,s[1]=h*T+u*v+d*V+f*W,s[5]=h*w+u*b+d*X+f*at,s[9]=h*P+u*F+d*z+f*ot,s[13]=h*U+u*O+d*J+f*pt,s[2]=g*T+_*v+p*V+m*W,s[6]=g*w+_*b+p*X+m*at,s[10]=g*P+_*F+p*z+m*ot,s[14]=g*U+_*O+p*J+m*pt,s[3]=y*T+x*v+M*V+C*W,s[7]=y*w+x*b+M*X+C*at,s[11]=y*P+x*F+M*z+C*ot,s[15]=y*U+x*O+M*J+C*pt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],_=t[7],p=t[11],m=t[15];return g*(+s*l*u-i*c*u-s*o*d+n*c*d+i*o*f-n*l*f)+_*(+e*l*f-e*c*d+s*a*d-i*a*f+i*c*h-s*l*h)+p*(+e*c*u-e*o*f-s*a*u+n*a*f+s*o*h-n*c*h)+m*(-i*o*h-e*l*u+e*o*d+i*a*u-n*a*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],_=t[13],p=t[14],m=t[15],y=u*p*c-_*d*c+_*l*f-o*p*f-u*l*m+o*d*m,x=g*d*c-h*p*c-g*l*f+a*p*f+h*l*m-a*d*m,M=h*_*c-g*u*c+g*o*f-a*_*f-h*o*m+a*u*m,C=g*u*l-h*_*l-g*o*d+a*_*d+h*o*p-a*u*p,T=e*y+n*x+i*M+s*C;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/T;return t[0]=y*w,t[1]=(_*d*s-u*p*s-_*i*f+n*p*f+u*i*m-n*d*m)*w,t[2]=(o*p*s-_*l*s+_*i*c-n*p*c-o*i*m+n*l*m)*w,t[3]=(u*l*s-o*d*s-u*i*c+n*d*c+o*i*f-n*l*f)*w,t[4]=x*w,t[5]=(h*p*s-g*d*s+g*i*f-e*p*f-h*i*m+e*d*m)*w,t[6]=(g*l*s-a*p*s-g*i*c+e*p*c+a*i*m-e*l*m)*w,t[7]=(a*d*s-h*l*s+h*i*c-e*d*c-a*i*f+e*l*f)*w,t[8]=M*w,t[9]=(g*u*s-h*_*s-g*n*f+e*_*f+h*n*m-e*u*m)*w,t[10]=(a*_*s-g*o*s+g*n*c-e*_*c-a*n*m+e*o*m)*w,t[11]=(h*o*s-a*u*s-h*n*c+e*u*c+a*n*f-e*o*f)*w,t[12]=C*w,t[13]=(h*_*i-g*u*i+g*n*d-e*_*d-h*n*p+e*u*p)*w,t[14]=(g*o*i-a*_*i-g*n*l+e*_*l+a*n*p-e*o*p)*w,t[15]=(a*u*i-h*o*i+h*n*l-e*u*l-a*n*d+e*o*d)*w,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,a=t.x,o=t.y,l=t.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,a){return this.set(1,n,s,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,c=s+s,h=a+a,u=o+o,d=s*c,f=s*h,g=s*u,_=a*h,p=a*u,m=o*u,y=l*c,x=l*h,M=l*u,C=n.x,T=n.y,w=n.z;return i[0]=(1-(_+m))*C,i[1]=(f+M)*C,i[2]=(g-x)*C,i[3]=0,i[4]=(f-M)*T,i[5]=(1-(d+m))*T,i[6]=(p+y)*T,i[7]=0,i[8]=(g+x)*w,i[9]=(p-y)*w,i[10]=(1-(d+_))*w,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=_i.set(i[0],i[1],i[2]).length();const a=_i.set(i[4],i[5],i[6]).length(),o=_i.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],Ze.copy(this);const c=1/s,h=1/a,u=1/o;return Ze.elements[0]*=c,Ze.elements[1]*=c,Ze.elements[2]*=c,Ze.elements[4]*=h,Ze.elements[5]*=h,Ze.elements[6]*=h,Ze.elements[8]*=u,Ze.elements[9]*=u,Ze.elements[10]*=u,e.setFromRotationMatrix(Ze),n.x=s,n.y=a,n.z=o,this}makePerspective(t,e,n,i,s,a,o=An){const l=this.elements,c=2*s/(e-t),h=2*s/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let f,g;if(o===An)f=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===Er)f=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,a,o=An){const l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(a-s),d=(e+t)*c,f=(n+i)*h;let g,_;if(o===An)g=(a+s)*u,_=-2*u;else if(o===Er)g=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const _i=new A,Ze=new Nt,Bu=new A(0,0,0),ku=new A(1,1,1),Nn=new A,ks=new A,ke=new A,hl=new Nt,ul=new on;class dn{constructor(t=0,e=0,n=0,i=dn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ee(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ee(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ee(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ee(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return hl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(hl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ul.setFromEuler(this),this.setFromQuaternion(ul,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}dn.DEFAULT_ORDER="XYZ";class Do{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Gu=0;const dl=new A,vi=new on,xn=new Nt,Gs=new A,ns=new A,Hu=new A,zu=new on,fl=new A(1,0,0),pl=new A(0,1,0),ml=new A(0,0,1),gl={type:"added"},Vu={type:"removed"},xi={type:"childadded",child:null},jr={type:"childremoved",child:null};class oe extends hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gu++}),this.uuid=an(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=oe.DEFAULT_UP.clone();const t=new A,e=new dn,n=new on,i=new A(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Nt},normalMatrix:{value:new Ot}}),this.matrix=new Nt,this.matrixWorld=new Nt,this.matrixAutoUpdate=oe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=oe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Do,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return vi.setFromAxisAngle(t,e),this.quaternion.multiply(vi),this}rotateOnWorldAxis(t,e){return vi.setFromAxisAngle(t,e),this.quaternion.premultiply(vi),this}rotateX(t){return this.rotateOnAxis(fl,t)}rotateY(t){return this.rotateOnAxis(pl,t)}rotateZ(t){return this.rotateOnAxis(ml,t)}translateOnAxis(t,e){return dl.copy(t).applyQuaternion(this.quaternion),this.position.add(dl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(fl,t)}translateY(t){return this.translateOnAxis(pl,t)}translateZ(t){return this.translateOnAxis(ml,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Gs.copy(t):Gs.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(ns,Gs,this.up):xn.lookAt(Gs,ns,this.up),this.quaternion.setFromRotationMatrix(xn),i&&(xn.extractRotation(i.matrixWorld),vi.setFromRotationMatrix(xn),this.quaternion.premultiply(vi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(gl),xi.child=t,this.dispatchEvent(xi),xi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Vu),jr.child=t,this.dispatchEvent(jr),jr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),xn.multiply(t.parent.matrixWorld)),t.applyMatrix4(xn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(gl),xi.child=t,this.dispatchEvent(xi),xi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ns,t,Hu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ns,zu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));i.material=o}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}oe.DEFAULT_UP=new A(0,1,0);oe.DEFAULT_MATRIX_AUTO_UPDATE=!0;oe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Qe=new A,yn=new A,$r=new A,Mn=new A,yi=new A,Mi=new A,_l=new A,Jr=new A,Zr=new A,Qr=new A,ta=new Jt,ea=new Jt,na=new Jt;class qe{constructor(t=new A,e=new A,n=new A){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Qe.subVectors(t,e),i.cross(Qe);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){Qe.subVectors(i,e),yn.subVectors(n,e),$r.subVectors(t,e);const a=Qe.dot(Qe),o=Qe.dot(yn),l=Qe.dot($r),c=yn.dot(yn),h=yn.dot($r),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,g=(a*h-o*l)*d;return s.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Mn)===null?!1:Mn.x>=0&&Mn.y>=0&&Mn.x+Mn.y<=1}static getInterpolation(t,e,n,i,s,a,o,l){return this.getBarycoord(t,e,n,i,Mn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Mn.x),l.addScaledVector(a,Mn.y),l.addScaledVector(o,Mn.z),l)}static getInterpolatedAttribute(t,e,n,i,s,a){return ta.setScalar(0),ea.setScalar(0),na.setScalar(0),ta.fromBufferAttribute(t,e),ea.fromBufferAttribute(t,n),na.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(ta,s.x),a.addScaledVector(ea,s.y),a.addScaledVector(na,s.z),a}static isFrontFacing(t,e,n,i){return Qe.subVectors(n,e),yn.subVectors(t,e),Qe.cross(yn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Qe.subVectors(this.c,this.b),yn.subVectors(this.a,this.b),Qe.cross(yn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return qe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return qe.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return qe.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return qe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return qe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let a,o;yi.subVectors(i,n),Mi.subVectors(s,n),Jr.subVectors(t,n);const l=yi.dot(Jr),c=Mi.dot(Jr);if(l<=0&&c<=0)return e.copy(n);Zr.subVectors(t,i);const h=yi.dot(Zr),u=Mi.dot(Zr);if(h>=0&&u<=h)return e.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(yi,a);Qr.subVectors(t,s);const f=yi.dot(Qr),g=Mi.dot(Qr);if(g>=0&&f<=g)return e.copy(s);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Mi,o);const p=h*g-f*u;if(p<=0&&u-h>=0&&f-g>=0)return _l.subVectors(s,i),o=(u-h)/(u-h+(f-g)),e.copy(i).addScaledVector(_l,o);const m=1/(p+_+d);return a=_*m,o=d*m,e.copy(n).addScaledVector(yi,a).addScaledVector(Mi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const qc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Un={h:0,s:0,l:0},Hs={h:0,s:0,l:0};function ia(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class yt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=fe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Kt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Kt.workingColorSpace){if(t=Io(t,1),e=Ee(e,0,1),n=Ee(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=ia(a,s,t+1/3),this.g=ia(a,s,t),this.b=ia(a,s,t-1/3)}return Kt.toWorkingColorSpace(this,i),this}setStyle(t,e=fe){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=fe){const n=qc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Oi(t.r),this.g=Oi(t.g),this.b=Oi(t.b),this}copyLinearToSRGB(t){return this.r=Hr(t.r),this.g=Hr(t.g),this.b=Hr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=fe){return Kt.fromWorkingColorSpace(Re.copy(this),t),Math.round(Ee(Re.r*255,0,255))*65536+Math.round(Ee(Re.g*255,0,255))*256+Math.round(Ee(Re.b*255,0,255))}getHexString(t=fe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.fromWorkingColorSpace(Re.copy(this),e);const n=Re.r,i=Re.g,s=Re.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Kt.workingColorSpace){return Kt.fromWorkingColorSpace(Re.copy(this),e),t.r=Re.r,t.g=Re.g,t.b=Re.b,t}getStyle(t=fe){Kt.fromWorkingColorSpace(Re.copy(this),t);const e=Re.r,n=Re.g,i=Re.b;return t!==fe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Un),this.setHSL(Un.h+t,Un.s+e,Un.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Un),t.getHSL(Hs);const n=_s(Un.h,Hs.h,e),i=_s(Un.s,Hs.s,e),s=_s(Un.l,Hs.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Re=new yt;yt.NAMES=qc;let Wu=0;class ln extends hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Wu++}),this.uuid=an(),this.name="",this.type="Material",this.blending=Ui,this.side=Tn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ra,this.blendDst=Ca,this.blendEquation=ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new yt(0,0,0),this.blendAlpha=0,this.depthFunc=ki,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=il,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=di,this.stencilZFail=di,this.stencilZPass=di,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ui&&(n.blending=this.blending),this.side!==Tn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ra&&(n.blendSrc=this.blendSrc),this.blendDst!==Ca&&(n.blendDst=this.blendDst),this.blendEquation!==ii&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ki&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==il&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==di&&(n.stencilFail=this.stencilFail),this.stencilZFail!==di&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==di&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(e){const s=i(t.textures),a=i(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ae extends ln{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dn,this.combine=Ac,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ve=new A,zs=new ft;class ge{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=fo,this.updateRanges=[],this.gpuType=rn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)zs.fromBufferAttribute(this,e),zs.applyMatrix3(t),this.setXY(e,zs.x,zs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=sn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ie(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=sn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ie(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=sn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ie(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=sn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ie(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=sn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ie(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ie(e,this.array),n=ie(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=ie(e,this.array),n=ie(n,this.array),i=ie(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=ie(e,this.array),n=ie(n,this.array),i=ie(i,this.array),s=ie(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==fo&&(t.usage=this.usage),t}}class Kc extends ge{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class jc extends ge{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ee extends ge{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Xu=0;const We=new Nt,sa=new oe,Si=new A,Ge=new je,is=new je,be=new A;class de extends hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Xu++}),this.uuid=an(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Wc(t)?jc:Kc)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ot().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return We.makeRotationFromQuaternion(t),this.applyMatrix4(We),this}rotateX(t){return We.makeRotationX(t),this.applyMatrix4(We),this}rotateY(t){return We.makeRotationY(t),this.applyMatrix4(We),this}rotateZ(t){return We.makeRotationZ(t),this.applyMatrix4(We),this}translate(t,e,n){return We.makeTranslation(t,e,n),this.applyMatrix4(We),this}scale(t,e,n){return We.makeScale(t,e,n),this.applyMatrix4(We),this}lookAt(t){return sa.lookAt(t),sa.updateMatrix(),this.applyMatrix4(sa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Si).negate(),this.translate(Si.x,Si.y,Si.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new ee(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new je);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];Ge.setFromBufferAttribute(s),this.morphTargetsRelative?(be.addVectors(this.boundingBox.min,Ge.min),this.boundingBox.expandByPoint(be),be.addVectors(this.boundingBox.max,Ge.max),this.boundingBox.expandByPoint(be)):(this.boundingBox.expandByPoint(Ge.min),this.boundingBox.expandByPoint(Ge.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(t){const n=this.boundingSphere.center;if(Ge.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];is.setFromBufferAttribute(o),this.morphTargetsRelative?(be.addVectors(Ge.min,is.min),Ge.expandByPoint(be),be.addVectors(Ge.max,is.max),Ge.expandByPoint(be)):(Ge.expandByPoint(is.min),Ge.expandByPoint(is.max))}Ge.getCenter(n);let i=0;for(let s=0,a=t.count;s<a;s++)be.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(be));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)be.fromBufferAttribute(o,c),l&&(Si.fromBufferAttribute(t,c),be.add(Si)),i=Math.max(i,n.distanceToSquared(be))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ge(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let P=0;P<n.count;P++)o[P]=new A,l[P]=new A;const c=new A,h=new A,u=new A,d=new ft,f=new ft,g=new ft,_=new A,p=new A;function m(P,U,v){c.fromBufferAttribute(n,P),h.fromBufferAttribute(n,U),u.fromBufferAttribute(n,v),d.fromBufferAttribute(s,P),f.fromBufferAttribute(s,U),g.fromBufferAttribute(s,v),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const b=1/(f.x*g.y-g.x*f.y);isFinite(b)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(b),p.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(b),o[P].add(_),o[U].add(_),o[v].add(_),l[P].add(p),l[U].add(p),l[v].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let P=0,U=y.length;P<U;++P){const v=y[P],b=v.start,F=v.count;for(let O=b,V=b+F;O<V;O+=3)m(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const x=new A,M=new A,C=new A,T=new A;function w(P){C.fromBufferAttribute(i,P),T.copy(C);const U=o[P];x.copy(U),x.sub(C.multiplyScalar(C.dot(U))).normalize(),M.crossVectors(T,U);const b=M.dot(l[P])<0?-1:1;a.setXYZW(P,x.x,x.y,x.z,b)}for(let P=0,U=y.length;P<U;++P){const v=y[P],b=v.start,F=v.count;for(let O=b,V=b+F;O<V;O+=3)w(t.getX(O+0)),w(t.getX(O+1)),w(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ge(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new A,s=new A,a=new A,o=new A,l=new A,c=new A,h=new A,u=new A;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),_=t.getX(d+1),p=t.getX(d+2);i.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),a.fromBufferAttribute(e,p),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)be.fromBufferAttribute(t,e),be.normalize(),t.setXYZ(e,be.x,be.y,be.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let m=0;m<h;m++)d[g++]=c[f++]}return new ge(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new de,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=t(l,n);e.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const s=t.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const vl=new Nt,Jn=new Rs,Vs=new fn,xl=new A,Ws=new A,Xs=new A,Ys=new A,ra=new A,qs=new A,yl=new A,Ks=new A;class wt extends oe{constructor(t=new de,e=new ae){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(s&&o){qs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],u=s[l];h!==0&&(ra.fromBufferAttribute(u,t),a?qs.addScaledVector(ra,h):qs.addScaledVector(ra.sub(e),h))}e.add(qs)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Vs.copy(n.boundingSphere),Vs.applyMatrix4(s),Jn.copy(t.ray).recast(t.near),!(Vs.containsPoint(Jn.origin)===!1&&(Jn.intersectSphere(Vs,xl)===null||Jn.origin.distanceToSquared(xl)>(t.far-t.near)**2))&&(vl.copy(s).invert(),Jn.copy(t.ray).applyMatrix4(vl),!(n.boundingBox!==null&&Jn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Jn)))}_computeIntersections(t,e,n){let i;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const p=d[g],m=a[p.materialIndex],y=Math.max(p.start,f.start),x=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let M=y,C=x;M<C;M+=3){const T=o.getX(M),w=o.getX(M+1),P=o.getX(M+2);i=js(this,m,t,n,c,h,u,T,w,P),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const y=o.getX(p),x=o.getX(p+1),M=o.getX(p+2);i=js(this,a,t,n,c,h,u,y,x,M),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const p=d[g],m=a[p.materialIndex],y=Math.max(p.start,f.start),x=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let M=y,C=x;M<C;M+=3){const T=M,w=M+1,P=M+2;i=js(this,m,t,n,c,h,u,T,w,P),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const y=p,x=p+1,M=p+2;i=js(this,a,t,n,c,h,u,y,x,M),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}}function Yu(r,t,e,n,i,s,a,o){let l;if(t.side===Ue?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,t.side===Tn,o),l===null)return null;Ks.copy(o),Ks.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Ks);return c<e.near||c>e.far?null:{distance:c,point:Ks.clone(),object:r}}function js(r,t,e,n,i,s,a,o,l,c){r.getVertexPosition(o,Ws),r.getVertexPosition(l,Xs),r.getVertexPosition(c,Ys);const h=Yu(r,t,e,n,Ws,Xs,Ys,yl);if(h){const u=new A;qe.getBarycoord(yl,Ws,Xs,Ys,u),i&&(h.uv=qe.getInterpolatedAttribute(i,o,l,c,u,new ft)),s&&(h.uv1=qe.getInterpolatedAttribute(s,o,l,c,u,new ft)),a&&(h.normal=qe.getInterpolatedAttribute(a,o,l,c,u,new A),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new A,materialIndex:0};qe.getNormal(Ws,Xs,Ys,d.normal),h.face=d,h.barycoord=u}return h}class Ye extends de{constructor(t=1,e=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,a,s,0),g("z","y","x",1,-1,n,e,-t,a,s,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,s,4),g("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new ee(c,3)),this.setAttribute("normal",new ee(h,3)),this.setAttribute("uv",new ee(u,2));function g(_,p,m,y,x,M,C,T,w,P,U){const v=M/w,b=C/P,F=M/2,O=C/2,V=T/2,X=w+1,z=P+1;let J=0,W=0;const at=new A;for(let ot=0;ot<z;ot++){const pt=ot*b-O;for(let Bt=0;Bt<X;Bt++){const Xt=Bt*v-F;at[_]=Xt*y,at[p]=pt*x,at[m]=V,c.push(at.x,at.y,at.z),at[_]=0,at[p]=0,at[m]=T>0?1:-1,h.push(at.x,at.y,at.z),u.push(Bt/w),u.push(1-ot/P),J+=1}}for(let ot=0;ot<P;ot++)for(let pt=0;pt<w;pt++){const Bt=d+pt+X*ot,Xt=d+pt+X*(ot+1),q=d+(pt+1)+X*(ot+1),et=d+(pt+1)+X*ot;l.push(Bt,Xt,et),l.push(Xt,q,et),W+=6}o.addGroup(f,W,U),f+=W,d+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ye(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Xi(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Pe(r){const t={};for(let e=0;e<r.length;e++){const n=Xi(r[e]);for(const i in n)t[i]=n[i]}return t}function qu(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function $c(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}const Ku={clone:Xi,merge:Pe};var ju=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,$u=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Yn extends ln{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ju,this.fragmentShader=$u,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Xi(t.uniforms),this.uniformsGroups=qu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Jc extends oe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Nt,this.projectionMatrix=new Nt,this.projectionMatrixInverse=new Nt,this.coordinateSystem=An}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Fn=new A,Ml=new ft,Sl=new ft;class Le extends Jc{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Wi*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(gs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Wi*2*Math.atan(Math.tan(gs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Fn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Fn.x,Fn.y).multiplyScalar(-t/Fn.z),Fn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fn.x,Fn.y).multiplyScalar(-t/Fn.z)}getViewSize(t,e){return this.getViewBounds(t,Ml,Sl),e.subVectors(Sl,Ml)}setViewOffset(t,e,n,i,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(gs*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const bi=-90,Ei=1;class Ju extends oe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Le(bi,Ei,t,e);i.layers=this.layers,this.add(i);const s=new Le(bi,Ei,t,e);s.layers=this.layers,this.add(s);const a=new Le(bi,Ei,t,e);a.layers=this.layers,this.add(a);const o=new Le(bi,Ei,t,e);o.layers=this.layers,this.add(o);const l=new Le(bi,Ei,t,e);l.layers=this.layers,this.add(l);const c=new Le(bi,Ei,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,a,o,l]=e;for(const c of e)this.remove(c);if(t===An)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Er)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Zc extends ye{constructor(t,e,n,i,s,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Gi,super(t,e,n,i,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Zu extends ci{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Zc(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ze}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Ye(5,5,5),s=new Yn({name:"CubemapFromEquirect",uniforms:Xi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ue,blending:Vn});s.uniforms.tEquirect.value=e;const a=new wt(i,s),o=e.minFilter;return e.minFilter===wn&&(e.minFilter=ze),new Ju(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(s)}}const aa=new A,Qu=new A,td=new Ot;class Bn{constructor(t=new A(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=aa.subVectors(n,e).cross(Qu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(aa),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||td.getNormalMatrix(t),i=this.coplanarPoint(aa).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Zn=new fn,$s=new A;class No{constructor(t=new Bn,e=new Bn,n=new Bn,i=new Bn,s=new Bn,a=new Bn){this.planes=[t,e,n,i,s,a]}set(t,e,n,i,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=An){const n=this.planes,i=t.elements,s=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],g=i[9],_=i[10],p=i[11],m=i[12],y=i[13],x=i[14],M=i[15];if(n[0].setComponents(l-s,d-c,p-f,M-m).normalize(),n[1].setComponents(l+s,d+c,p+f,M+m).normalize(),n[2].setComponents(l+a,d+h,p+g,M+y).normalize(),n[3].setComponents(l-a,d-h,p-g,M-y).normalize(),n[4].setComponents(l-o,d-u,p-_,M-x).normalize(),e===An)n[5].setComponents(l+o,d+u,p+_,M+x).normalize();else if(e===Er)n[5].setComponents(o,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Zn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Zn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Zn)}intersectsSprite(t){return Zn.center.set(0,0,0),Zn.radius=.7071067811865476,Zn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Zn)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if($s.x=i.normal.x>0?t.max.x:t.min.x,$s.y=i.normal.y>0?t.max.y:t.min.y,$s.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint($s)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Qc(){let r=null,t=!1,e=null,n=null;function i(s,a){e(s,a),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function ed(r){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(r.bindBuffer(c,o),u.length===0)r.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const _=u[f];r.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(r.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}class Cs extends de{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=t/o,d=e/l,f=[],g=[],_=[],p=[];for(let m=0;m<h;m++){const y=m*d-a;for(let x=0;x<c;x++){const M=x*u-s;g.push(M,-y,0),_.push(0,0,1),p.push(x/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let y=0;y<o;y++){const x=y+c*m,M=y+c*(m+1),C=y+1+c*(m+1),T=y+1+c*m;f.push(x,M,T),f.push(M,C,T)}this.setIndex(f),this.setAttribute("position",new ee(g,3)),this.setAttribute("normal",new ee(_,3)),this.setAttribute("uv",new ee(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cs(t.width,t.height,t.widthSegments,t.heightSegments)}}var nd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,id=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,sd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,rd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ad=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,od=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ld=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,cd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,hd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,ud=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,dd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,fd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,pd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,md=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,gd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,_d=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,vd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Md=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Sd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,bd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ed=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,wd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ad=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Td=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Rd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Cd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Pd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ld=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Id="gl_FragColor = linearToOutputTexel( gl_FragColor );",Dd=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Nd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ud=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Fd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Od=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Bd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,kd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Gd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,zd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Wd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Xd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Yd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Kd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,jd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,$d=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Jd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Zd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Qd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,tf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ef=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,nf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,sf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,af=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,of=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,cf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,uf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,df=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ff=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,pf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,mf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,gf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_f=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,xf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Mf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Sf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ef=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Af=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Tf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Pf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Lf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,If=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Df=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Nf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Uf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ff=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Of=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,kf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Gf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Hf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,zf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Vf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Wf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Yf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Kf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,jf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,$f=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Jf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Zf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Qf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ep=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const np=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ip=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ap=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,op=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,cp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,hp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,up=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,dp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,_p=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Mp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,bp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ep=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ap=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Tp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Lp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ip=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Np=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Up=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ft={alphahash_fragment:nd,alphahash_pars_fragment:id,alphamap_fragment:sd,alphamap_pars_fragment:rd,alphatest_fragment:ad,alphatest_pars_fragment:od,aomap_fragment:ld,aomap_pars_fragment:cd,batching_pars_vertex:hd,batching_vertex:ud,begin_vertex:dd,beginnormal_vertex:fd,bsdfs:pd,iridescence_fragment:md,bumpmap_pars_fragment:gd,clipping_planes_fragment:_d,clipping_planes_pars_fragment:vd,clipping_planes_pars_vertex:xd,clipping_planes_vertex:yd,color_fragment:Md,color_pars_fragment:Sd,color_pars_vertex:bd,color_vertex:Ed,common:wd,cube_uv_reflection_fragment:Ad,defaultnormal_vertex:Td,displacementmap_pars_vertex:Rd,displacementmap_vertex:Cd,emissivemap_fragment:Pd,emissivemap_pars_fragment:Ld,colorspace_fragment:Id,colorspace_pars_fragment:Dd,envmap_fragment:Nd,envmap_common_pars_fragment:Ud,envmap_pars_fragment:Fd,envmap_pars_vertex:Od,envmap_physical_pars_fragment:Kd,envmap_vertex:Bd,fog_vertex:kd,fog_pars_vertex:Gd,fog_fragment:Hd,fog_pars_fragment:zd,gradientmap_pars_fragment:Vd,lightmap_pars_fragment:Wd,lights_lambert_fragment:Xd,lights_lambert_pars_fragment:Yd,lights_pars_begin:qd,lights_toon_fragment:jd,lights_toon_pars_fragment:$d,lights_phong_fragment:Jd,lights_phong_pars_fragment:Zd,lights_physical_fragment:Qd,lights_physical_pars_fragment:tf,lights_fragment_begin:ef,lights_fragment_maps:nf,lights_fragment_end:sf,logdepthbuf_fragment:rf,logdepthbuf_pars_fragment:af,logdepthbuf_pars_vertex:of,logdepthbuf_vertex:lf,map_fragment:cf,map_pars_fragment:hf,map_particle_fragment:uf,map_particle_pars_fragment:df,metalnessmap_fragment:ff,metalnessmap_pars_fragment:pf,morphinstance_vertex:mf,morphcolor_vertex:gf,morphnormal_vertex:_f,morphtarget_pars_vertex:vf,morphtarget_vertex:xf,normal_fragment_begin:yf,normal_fragment_maps:Mf,normal_pars_fragment:Sf,normal_pars_vertex:bf,normal_vertex:Ef,normalmap_pars_fragment:wf,clearcoat_normal_fragment_begin:Af,clearcoat_normal_fragment_maps:Tf,clearcoat_pars_fragment:Rf,iridescence_pars_fragment:Cf,opaque_fragment:Pf,packing:Lf,premultiplied_alpha_fragment:If,project_vertex:Df,dithering_fragment:Nf,dithering_pars_fragment:Uf,roughnessmap_fragment:Ff,roughnessmap_pars_fragment:Of,shadowmap_pars_fragment:Bf,shadowmap_pars_vertex:kf,shadowmap_vertex:Gf,shadowmask_pars_fragment:Hf,skinbase_vertex:zf,skinning_pars_vertex:Vf,skinning_vertex:Wf,skinnormal_vertex:Xf,specularmap_fragment:Yf,specularmap_pars_fragment:qf,tonemapping_fragment:Kf,tonemapping_pars_fragment:jf,transmission_fragment:$f,transmission_pars_fragment:Jf,uv_pars_fragment:Zf,uv_pars_vertex:Qf,uv_vertex:tp,worldpos_vertex:ep,background_vert:np,background_frag:ip,backgroundCube_vert:sp,backgroundCube_frag:rp,cube_vert:ap,cube_frag:op,depth_vert:lp,depth_frag:cp,distanceRGBA_vert:hp,distanceRGBA_frag:up,equirect_vert:dp,equirect_frag:fp,linedashed_vert:pp,linedashed_frag:mp,meshbasic_vert:gp,meshbasic_frag:_p,meshlambert_vert:vp,meshlambert_frag:xp,meshmatcap_vert:yp,meshmatcap_frag:Mp,meshnormal_vert:Sp,meshnormal_frag:bp,meshphong_vert:Ep,meshphong_frag:wp,meshphysical_vert:Ap,meshphysical_frag:Tp,meshtoon_vert:Rp,meshtoon_frag:Cp,points_vert:Pp,points_frag:Lp,shadow_vert:Ip,shadow_frag:Dp,sprite_vert:Np,sprite_frag:Up},st={common:{diffuse:{value:new yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new yt(16777215)},opacity:{value:1},center:{value:new ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},hn={basic:{uniforms:Pe([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.fog]),vertexShader:Ft.meshbasic_vert,fragmentShader:Ft.meshbasic_frag},lambert:{uniforms:Pe([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new yt(0)}}]),vertexShader:Ft.meshlambert_vert,fragmentShader:Ft.meshlambert_frag},phong:{uniforms:Pe([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new yt(0)},specular:{value:new yt(1118481)},shininess:{value:30}}]),vertexShader:Ft.meshphong_vert,fragmentShader:Ft.meshphong_frag},standard:{uniforms:Pe([st.common,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.roughnessmap,st.metalnessmap,st.fog,st.lights,{emissive:{value:new yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag},toon:{uniforms:Pe([st.common,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.gradientmap,st.fog,st.lights,{emissive:{value:new yt(0)}}]),vertexShader:Ft.meshtoon_vert,fragmentShader:Ft.meshtoon_frag},matcap:{uniforms:Pe([st.common,st.bumpmap,st.normalmap,st.displacementmap,st.fog,{matcap:{value:null}}]),vertexShader:Ft.meshmatcap_vert,fragmentShader:Ft.meshmatcap_frag},points:{uniforms:Pe([st.points,st.fog]),vertexShader:Ft.points_vert,fragmentShader:Ft.points_frag},dashed:{uniforms:Pe([st.common,st.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ft.linedashed_vert,fragmentShader:Ft.linedashed_frag},depth:{uniforms:Pe([st.common,st.displacementmap]),vertexShader:Ft.depth_vert,fragmentShader:Ft.depth_frag},normal:{uniforms:Pe([st.common,st.bumpmap,st.normalmap,st.displacementmap,{opacity:{value:1}}]),vertexShader:Ft.meshnormal_vert,fragmentShader:Ft.meshnormal_frag},sprite:{uniforms:Pe([st.sprite,st.fog]),vertexShader:Ft.sprite_vert,fragmentShader:Ft.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ft.background_vert,fragmentShader:Ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:Ft.backgroundCube_vert,fragmentShader:Ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ft.cube_vert,fragmentShader:Ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ft.equirect_vert,fragmentShader:Ft.equirect_frag},distanceRGBA:{uniforms:Pe([st.common,st.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ft.distanceRGBA_vert,fragmentShader:Ft.distanceRGBA_frag},shadow:{uniforms:Pe([st.lights,st.fog,{color:{value:new yt(0)},opacity:{value:1}}]),vertexShader:Ft.shadow_vert,fragmentShader:Ft.shadow_frag}};hn.physical={uniforms:Pe([hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new yt(0)},specularColor:{value:new yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag};const Js={r:0,b:0,g:0},Qn=new dn,Fp=new Nt;function Op(r,t,e,n,i,s,a){const o=new yt(0);let l=s===!0?0:1,c,h,u=null,d=0,f=null;function g(y){let x=y.isScene===!0?y.background:null;return x&&x.isTexture&&(x=(y.backgroundBlurriness>0?e:t).get(x)),x}function _(y){let x=!1;const M=g(y);M===null?m(o,l):M&&M.isColor&&(m(M,1),x=!0);const C=r.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function p(y,x){const M=g(x);M&&(M.isCubeTexture||M.mapping===Cr)?(h===void 0&&(h=new wt(new Ye(1,1,1),new Yn({name:"BackgroundCubeMaterial",uniforms:Xi(hn.backgroundCube.uniforms),vertexShader:hn.backgroundCube.vertexShader,fragmentShader:hn.backgroundCube.fragmentShader,side:Ue,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,T,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Qn.copy(x.backgroundRotation),Qn.x*=-1,Qn.y*=-1,Qn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Qn.y*=-1,Qn.z*=-1),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Fp.makeRotationFromEuler(Qn)),h.material.toneMapped=Kt.getTransfer(M.colorSpace)!==ue,(u!==M||d!==M.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=M,d=M.version,f=r.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new wt(new Cs(2,2),new Yn({name:"BackgroundMaterial",uniforms:Xi(hn.background.uniforms),vertexShader:hn.background.vertexShader,fragmentShader:hn.background.fragmentShader,side:Tn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=Kt.getTransfer(M.colorSpace)!==ue,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||d!==M.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,u=M,d=M.version,f=r.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function m(y,x){y.getRGB(Js,$c(r)),n.buffers.color.setClear(Js.r,Js.g,Js.b,x,a)}return{getClearColor:function(){return o},setClearColor:function(y,x=1){o.set(y),l=x,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,m(o,l)},render:_,addToRenderList:p}}function Bp(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,a=!1;function o(v,b,F,O,V){let X=!1;const z=u(O,F,b);s!==z&&(s=z,c(s.object)),X=f(v,O,F,V),X&&g(v,O,F,V),V!==null&&t.update(V,r.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,M(v,b,F,O),V!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return r.createVertexArray()}function c(v){return r.bindVertexArray(v)}function h(v){return r.deleteVertexArray(v)}function u(v,b,F){const O=F.wireframe===!0;let V=n[v.id];V===void 0&&(V={},n[v.id]=V);let X=V[b.id];X===void 0&&(X={},V[b.id]=X);let z=X[O];return z===void 0&&(z=d(l()),X[O]=z),z}function d(v){const b=[],F=[],O=[];for(let V=0;V<e;V++)b[V]=0,F[V]=0,O[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:b,enabledAttributes:F,attributeDivisors:O,object:v,attributes:{},index:null}}function f(v,b,F,O){const V=s.attributes,X=b.attributes;let z=0;const J=F.getAttributes();for(const W in J)if(J[W].location>=0){const ot=V[W];let pt=X[W];if(pt===void 0&&(W==="instanceMatrix"&&v.instanceMatrix&&(pt=v.instanceMatrix),W==="instanceColor"&&v.instanceColor&&(pt=v.instanceColor)),ot===void 0||ot.attribute!==pt||pt&&ot.data!==pt.data)return!0;z++}return s.attributesNum!==z||s.index!==O}function g(v,b,F,O){const V={},X=b.attributes;let z=0;const J=F.getAttributes();for(const W in J)if(J[W].location>=0){let ot=X[W];ot===void 0&&(W==="instanceMatrix"&&v.instanceMatrix&&(ot=v.instanceMatrix),W==="instanceColor"&&v.instanceColor&&(ot=v.instanceColor));const pt={};pt.attribute=ot,ot&&ot.data&&(pt.data=ot.data),V[W]=pt,z++}s.attributes=V,s.attributesNum=z,s.index=O}function _(){const v=s.newAttributes;for(let b=0,F=v.length;b<F;b++)v[b]=0}function p(v){m(v,0)}function m(v,b){const F=s.newAttributes,O=s.enabledAttributes,V=s.attributeDivisors;F[v]=1,O[v]===0&&(r.enableVertexAttribArray(v),O[v]=1),V[v]!==b&&(r.vertexAttribDivisor(v,b),V[v]=b)}function y(){const v=s.newAttributes,b=s.enabledAttributes;for(let F=0,O=b.length;F<O;F++)b[F]!==v[F]&&(r.disableVertexAttribArray(F),b[F]=0)}function x(v,b,F,O,V,X,z){z===!0?r.vertexAttribIPointer(v,b,F,V,X):r.vertexAttribPointer(v,b,F,O,V,X)}function M(v,b,F,O){_();const V=O.attributes,X=F.getAttributes(),z=b.defaultAttributeValues;for(const J in X){const W=X[J];if(W.location>=0){let at=V[J];if(at===void 0&&(J==="instanceMatrix"&&v.instanceMatrix&&(at=v.instanceMatrix),J==="instanceColor"&&v.instanceColor&&(at=v.instanceColor)),at!==void 0){const ot=at.normalized,pt=at.itemSize,Bt=t.get(at);if(Bt===void 0)continue;const Xt=Bt.buffer,q=Bt.type,et=Bt.bytesPerElement,gt=q===r.INT||q===r.UNSIGNED_INT||at.gpuType===bo;if(at.isInterleavedBufferAttribute){const ht=at.data,Rt=ht.stride,At=at.offset;if(ht.isInstancedInterleavedBuffer){for(let kt=0;kt<W.locationSize;kt++)m(W.location+kt,ht.meshPerAttribute);v.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let kt=0;kt<W.locationSize;kt++)p(W.location+kt);r.bindBuffer(r.ARRAY_BUFFER,Xt);for(let kt=0;kt<W.locationSize;kt++)x(W.location+kt,pt/W.locationSize,q,ot,Rt*et,(At+pt/W.locationSize*kt)*et,gt)}else{if(at.isInstancedBufferAttribute){for(let ht=0;ht<W.locationSize;ht++)m(W.location+ht,at.meshPerAttribute);v.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let ht=0;ht<W.locationSize;ht++)p(W.location+ht);r.bindBuffer(r.ARRAY_BUFFER,Xt);for(let ht=0;ht<W.locationSize;ht++)x(W.location+ht,pt/W.locationSize,q,ot,pt*et,pt/W.locationSize*ht*et,gt)}}else if(z!==void 0){const ot=z[J];if(ot!==void 0)switch(ot.length){case 2:r.vertexAttrib2fv(W.location,ot);break;case 3:r.vertexAttrib3fv(W.location,ot);break;case 4:r.vertexAttrib4fv(W.location,ot);break;default:r.vertexAttrib1fv(W.location,ot)}}}}y()}function C(){P();for(const v in n){const b=n[v];for(const F in b){const O=b[F];for(const V in O)h(O[V].object),delete O[V];delete b[F]}delete n[v]}}function T(v){if(n[v.id]===void 0)return;const b=n[v.id];for(const F in b){const O=b[F];for(const V in O)h(O[V].object),delete O[V];delete b[F]}delete n[v.id]}function w(v){for(const b in n){const F=n[b];if(F[v.id]===void 0)continue;const O=F[v.id];for(const V in O)h(O[V].object),delete O[V];delete F[v.id]}}function P(){U(),a=!0,s!==i&&(s=i,c(s.object))}function U(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:P,resetDefaultState:U,dispose:C,releaseStatesOfGeometry:T,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:p,disableUnusedAttributes:y}}function kp(r,t,e){let n;function i(c){n=c}function s(c,h){r.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,u){u!==0&&(r.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_];for(let _=0;_<d.length;_++)e.update(g,n,d[_])}}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Gp(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(w){return!(w!==Ke&&n.convert(w)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const P=w===Ts&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==Rn&&n.convert(w)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==rn&&!P)}function l(w){if(w==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(d===!0){const w=t.get("EXT_clip_control");w.clipControlEXT(w.LOWER_LEFT_EXT,w.ZERO_TO_ONE_EXT)}const f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),p=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),y=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),x=r.getParameter(r.MAX_VARYING_VECTORS),M=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,T=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:y,maxVaryings:x,maxFragmentUniforms:M,vertexTextures:C,maxSamples:T}}function Hp(r){const t=this;let e=null,n=0,i=!1,s=!1;const a=new Bn,o=new Ot,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,m=r.get(u);if(!i||g===null||g.length===0||s&&!p)s?h(null):c();else{const y=s?0:n,x=y*4;let M=m.clippingState||null;l.value=M,M=h(g,d,x,f);for(let C=0;C!==x;++C)M[C]=e[C];m.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const m=f+_*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(p===null||p.length<m)&&(p=new Float32Array(m));for(let x=0,M=f;x!==_;++x,M+=4)a.copy(u[x]).applyMatrix4(y,o),a.normal.toArray(p,M),p[M+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function zp(r){let t=new WeakMap;function e(a,o){return o===Oa?a.mapping=Gi:o===Ba&&(a.mapping=Hi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Oa||o===Ba)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Zu(l.height);return c.fromEquirectangularTexture(r,a),t.set(a,c),a.addEventListener("dispose",i),e(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class Uo extends Jc{constructor(t=-1,e=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ni=4,bl=[.125,.215,.35,.446,.526,.582],si=20,oa=new Uo,El=new yt;let la=null,ca=0,ha=0,ua=!1;const ni=(1+Math.sqrt(5))/2,wi=1/ni,wl=[new A(-ni,wi,0),new A(ni,wi,0),new A(-wi,0,ni),new A(wi,0,ni),new A(0,ni,-wi),new A(0,ni,wi),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)];class Al{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){la=this._renderer.getRenderTarget(),ca=this._renderer.getActiveCubeFace(),ha=this._renderer.getActiveMipmapLevel(),ua=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Cl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(la,ca,ha),this._renderer.xr.enabled=ua,t.scissorTest=!1,Zs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Gi||t.mapping===Hi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),la=this._renderer.getRenderTarget(),ca=this._renderer.getActiveCubeFace(),ha=this._renderer.getActiveMipmapLevel(),ua=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:ze,minFilter:ze,generateMipmaps:!1,type:Ts,format:Ke,colorSpace:Ae,depthBuffer:!1},i=Tl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Tl(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Vp(s)),this._blurMaterial=Wp(s,t,e)}return i}_compileMaterial(t){const e=new wt(this._lodPlanes[0],t);this._renderer.compile(e,oa)}_sceneToCubeUV(t,e,n,i){const o=new Le(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(El),h.toneMapping=Wn,h.autoClear=!1;const f=new ae({name:"PMREM.Background",side:Ue,depthWrite:!1,depthTest:!1}),g=new wt(new Ye,f);let _=!1;const p=t.background;p?p.isColor&&(f.color.copy(p),t.background=null,_=!0):(f.color.copy(El),_=!0);for(let m=0;m<6;m++){const y=m%3;y===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):y===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));const x=this._cubeSize;Zs(i,y*x,m>2?x:0,x,x),h.setRenderTarget(i),_&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Gi||t.mapping===Hi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Cl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rl());const s=i?this._cubemapMaterial:this._equirectMaterial,a=new wt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;Zs(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,oa)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=wl[(i-s-1)%wl.length];this._blur(t,s-1,s,a,o)}e.autoClear=n}_blur(t,e,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",s),this._halfBlur(a,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new wt(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*si-1),_=s/g,p=isFinite(s)?1+Math.floor(h*_):si;p>si&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${si}`);const m=[];let y=0;for(let w=0;w<si;++w){const P=w/_,U=Math.exp(-P*P/2);m.push(U),w===0?y+=U:w<p&&(y+=2*U)}for(let w=0;w<m.length;w++)m[w]=m[w]/y;d.envMap.value=t.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:x}=this;d.dTheta.value=g,d.mipInt.value=x-n;const M=this._sizeLods[i],C=3*M*(i>x-Ni?i-x+Ni:0),T=4*(this._cubeSize-M);Zs(e,C,T,3*M,2*M),l.setRenderTarget(e),l.render(u,oa)}}function Vp(r){const t=[],e=[],n=[];let i=r;const s=r-Ni+1+bl.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>r-Ni?l=bl[a-r+Ni-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,p=2,m=1,y=new Float32Array(_*g*f),x=new Float32Array(p*g*f),M=new Float32Array(m*g*f);for(let T=0;T<f;T++){const w=T%3*2/3-1,P=T>2?0:-1,U=[w,P,0,w+2/3,P,0,w+2/3,P+1,0,w,P,0,w+2/3,P+1,0,w,P+1,0];y.set(U,_*g*T),x.set(d,p*g*T);const v=[T,T,T,T,T,T];M.set(v,m*g*T)}const C=new de;C.setAttribute("position",new ge(y,_)),C.setAttribute("uv",new ge(x,p)),C.setAttribute("faceIndex",new ge(M,m)),t.push(C),i>Ni&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Tl(r,t,e){const n=new ci(r,t,e);return n.texture.mapping=Cr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Zs(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function Wp(r,t,e){const n=new Float32Array(si),i=new A(0,1,0);return new Yn({name:"SphericalGaussianBlur",defines:{n:si,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Fo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Rl(){return new Yn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Cl(){return new Yn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Fo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Xp(r){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Oa||l===Ba,h=l===Gi||l===Hi;if(c||h){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new Al(r)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new Al(r)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Yp(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&_r("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function qp(r,t,e,n){const i={},s=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)t.remove(_[p])}d.removeEventListener("dispose",a),delete i[d.id];const f=s.get(d);f&&(t.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)t.update(d[g],r.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let p=0,m=_.length;p<m;p++)t.update(_[p],r.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const y=f.array;_=f.version;for(let x=0,M=y.length;x<M;x+=3){const C=y[x+0],T=y[x+1],w=y[x+2];d.push(C,T,T,w,w,C)}}else if(g!==void 0){const y=g.array;_=g.version;for(let x=0,M=y.length/3-1;x<M;x+=3){const C=x+0,T=x+1,w=x+2;d.push(C,T,T,w,w,C)}}else return;const p=new(Wc(d)?jc:Kc)(d,1);p.version=_;const m=s.get(u);m&&t.remove(m),s.set(u,p)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Kp(r,t,e){let n;function i(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,f){r.drawElements(n,f,s,d*a),e.update(f,n,1)}function c(d,f,g){g!==0&&(r.drawElementsInstanced(n,f,s,d*a,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,g);let p=0;for(let m=0;m<g;m++)p+=f[m];e.update(p,n,1)}function u(d,f,g,_){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d.length;m++)c(d[m]/a,f[m],_[m]);else{p.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,_,0,g);let m=0;for(let y=0;y<g;y++)m+=f[y];for(let y=0;y<_.length;y++)e.update(m,n,_[y])}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function jp(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case r.TRIANGLES:e.triangles+=o*(s/3);break;case r.LINES:e.lines+=o*(s/2);break;case r.LINE_STRIP:e.lines+=o*(s-1);break;case r.LINE_LOOP:e.lines+=o*s;break;case r.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function $p(r,t,e){const n=new WeakMap,i=new Jt;function s(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let v=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",v)};var f=v;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),_===!0&&(M=2),p===!0&&(M=3);let C=o.attributes.position.count*M,T=1;C>t.maxTextureSize&&(T=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const w=new Float32Array(C*T*4*u),P=new Yc(w,C,T,u);P.type=rn,P.needsUpdate=!0;const U=M*4;for(let b=0;b<u;b++){const F=m[b],O=y[b],V=x[b],X=C*T*4*b;for(let z=0;z<F.count;z++){const J=z*U;g===!0&&(i.fromBufferAttribute(F,z),w[X+J+0]=i.x,w[X+J+1]=i.y,w[X+J+2]=i.z,w[X+J+3]=0),_===!0&&(i.fromBufferAttribute(O,z),w[X+J+4]=i.x,w[X+J+5]=i.y,w[X+J+6]=i.z,w[X+J+7]=0),p===!0&&(i.fromBufferAttribute(V,z),w[X+J+8]=i.x,w[X+J+9]=i.y,w[X+J+10]=i.z,w[X+J+11]=V.itemSize===4?i.w:1)}}d={count:u,texture:P,size:new ft(C,T)},n.set(o,d),o.addEventListener("dispose",v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,e);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const _=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(r,"morphTargetBaseInfluence",_),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function Jp(r,t,e,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:a}}class th extends ye{constructor(t,e,n,i,s,a,o,l,c,h=Fi){if(h!==Fi&&h!==Vi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Fi&&(n=li),n===void 0&&h===Vi&&(n=zi),super(null,i,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ie,this.minFilter=l!==void 0?l:Ie,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const eh=new ye,Pl=new th(1,1),nh=new Yc,ih=new Fu,sh=new Zc,Ll=[],Il=[],Dl=new Float32Array(16),Nl=new Float32Array(9),Ul=new Float32Array(4);function ji(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=Ll[i];if(s===void 0&&(s=new Float32Array(i),Ll[i]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,r[a].toArray(s,o)}return s}function Me(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function Se(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Lr(r,t){let e=Il[t];e===void 0&&(e=new Int32Array(t),Il[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function Zp(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Qp(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;r.uniform2fv(this.addr,t),Se(e,t)}}function tm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Me(e,t))return;r.uniform3fv(this.addr,t),Se(e,t)}}function em(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;r.uniform4fv(this.addr,t),Se(e,t)}}function nm(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Se(e,t)}else{if(Me(e,n))return;Ul.set(n),r.uniformMatrix2fv(this.addr,!1,Ul),Se(e,n)}}function im(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Se(e,t)}else{if(Me(e,n))return;Nl.set(n),r.uniformMatrix3fv(this.addr,!1,Nl),Se(e,n)}}function sm(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Se(e,t)}else{if(Me(e,n))return;Dl.set(n),r.uniformMatrix4fv(this.addr,!1,Dl),Se(e,n)}}function rm(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function am(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;r.uniform2iv(this.addr,t),Se(e,t)}}function om(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;r.uniform3iv(this.addr,t),Se(e,t)}}function lm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;r.uniform4iv(this.addr,t),Se(e,t)}}function cm(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function hm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;r.uniform2uiv(this.addr,t),Se(e,t)}}function um(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;r.uniform3uiv(this.addr,t),Se(e,t)}}function dm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;r.uniform4uiv(this.addr,t),Se(e,t)}}function fm(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Pl.compareFunction=Vc,s=Pl):s=eh,e.setTexture2D(t||s,i)}function pm(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||ih,i)}function mm(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||sh,i)}function gm(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||nh,i)}function _m(r){switch(r){case 5126:return Zp;case 35664:return Qp;case 35665:return tm;case 35666:return em;case 35674:return nm;case 35675:return im;case 35676:return sm;case 5124:case 35670:return rm;case 35667:case 35671:return am;case 35668:case 35672:return om;case 35669:case 35673:return lm;case 5125:return cm;case 36294:return hm;case 36295:return um;case 36296:return dm;case 35678:case 36198:case 36298:case 36306:case 35682:return fm;case 35679:case 36299:case 36307:return pm;case 35680:case 36300:case 36308:case 36293:return mm;case 36289:case 36303:case 36311:case 36292:return gm}}function vm(r,t){r.uniform1fv(this.addr,t)}function xm(r,t){const e=ji(t,this.size,2);r.uniform2fv(this.addr,e)}function ym(r,t){const e=ji(t,this.size,3);r.uniform3fv(this.addr,e)}function Mm(r,t){const e=ji(t,this.size,4);r.uniform4fv(this.addr,e)}function Sm(r,t){const e=ji(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function bm(r,t){const e=ji(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function Em(r,t){const e=ji(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function wm(r,t){r.uniform1iv(this.addr,t)}function Am(r,t){r.uniform2iv(this.addr,t)}function Tm(r,t){r.uniform3iv(this.addr,t)}function Rm(r,t){r.uniform4iv(this.addr,t)}function Cm(r,t){r.uniform1uiv(this.addr,t)}function Pm(r,t){r.uniform2uiv(this.addr,t)}function Lm(r,t){r.uniform3uiv(this.addr,t)}function Im(r,t){r.uniform4uiv(this.addr,t)}function Dm(r,t,e){const n=this.cache,i=t.length,s=Lr(e,i);Me(n,s)||(r.uniform1iv(this.addr,s),Se(n,s));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||eh,s[a])}function Nm(r,t,e){const n=this.cache,i=t.length,s=Lr(e,i);Me(n,s)||(r.uniform1iv(this.addr,s),Se(n,s));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||ih,s[a])}function Um(r,t,e){const n=this.cache,i=t.length,s=Lr(e,i);Me(n,s)||(r.uniform1iv(this.addr,s),Se(n,s));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||sh,s[a])}function Fm(r,t,e){const n=this.cache,i=t.length,s=Lr(e,i);Me(n,s)||(r.uniform1iv(this.addr,s),Se(n,s));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||nh,s[a])}function Om(r){switch(r){case 5126:return vm;case 35664:return xm;case 35665:return ym;case 35666:return Mm;case 35674:return Sm;case 35675:return bm;case 35676:return Em;case 5124:case 35670:return wm;case 35667:case 35671:return Am;case 35668:case 35672:return Tm;case 35669:case 35673:return Rm;case 5125:return Cm;case 36294:return Pm;case 36295:return Lm;case 36296:return Im;case 35678:case 36198:case 36298:case 36306:case 35682:return Dm;case 35679:case 36299:case 36307:return Nm;case 35680:case 36300:case 36308:case 36293:return Um;case 36289:case 36303:case 36311:case 36292:return Fm}}class Bm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=_m(e.type)}}class km{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Om(e.type)}}class Gm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(t,e[o.id],n)}}}const da=/(\w+)(\])?(\[|\.)?/g;function Fl(r,t){r.seq.push(t),r.map[t.id]=t}function Hm(r,t,e){const n=r.name,i=n.length;for(da.lastIndex=0;;){const s=da.exec(n),a=da.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Fl(e,c===void 0?new Bm(o,r,t):new km(o,r,t));break}else{let u=e.map[o];u===void 0&&(u=new Gm(o),Fl(e,u)),e=u}}}class vr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),a=t.getUniformLocation(e,s.name);Hm(s,a,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,a=e.length;s!==a;++s){const o=e[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function Ol(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const zm=37297;let Vm=0;function Wm(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function Xm(r){const t=Kt.getPrimaries(Kt.workingColorSpace),e=Kt.getPrimaries(r);let n;switch(t===e?n="":t===br&&e===Sr?n="LinearDisplayP3ToLinearSRGB":t===Sr&&e===br&&(n="LinearSRGBToLinearDisplayP3"),r){case Ae:case Pr:return[n,"LinearTransferOETF"];case fe:case Lo:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Bl(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const a=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+Wm(r.getShaderSource(t),a)}else return i}function Ym(r,t){const e=Xm(t);return`vec4 ${r}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function qm(r,t){let e;switch(t){case Xh:e="Linear";break;case Yh:e="Reinhard";break;case qh:e="Cineon";break;case Tc:e="ACESFilmic";break;case jh:e="AgX";break;case $h:e="Neutral";break;case Kh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Qs=new A;function Km(){Kt.getLuminanceCoefficients(Qs);const r=Qs.x.toFixed(4),t=Qs.y.toFixed(4),e=Qs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function jm(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ps).join(`
`)}function $m(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Jm(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:r.getAttribLocation(t,a),locationSize:o}}return e}function ps(r){return r!==""}function kl(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Gl(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Zm=/^[ \t]*#include +<([\w\d./]+)>/gm;function po(r){return r.replace(Zm,tg)}const Qm=new Map;function tg(r,t){let e=Ft[t];if(e===void 0){const n=Qm.get(t);if(n!==void 0)e=Ft[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return po(e)}const eg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hl(r){return r.replace(eg,ng)}function ng(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function zl(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function ig(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Ec?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===wc?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===bn&&(t="SHADOWMAP_TYPE_VSM"),t}function sg(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Gi:case Hi:t="ENVMAP_TYPE_CUBE";break;case Cr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function rg(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Hi:t="ENVMAP_MODE_REFRACTION";break}return t}function ag(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Ac:t="ENVMAP_BLENDING_MULTIPLY";break;case Vh:t="ENVMAP_BLENDING_MIX";break;case Wh:t="ENVMAP_BLENDING_ADD";break}return t}function og(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function lg(r,t,e,n){const i=r.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=ig(e),c=sg(e),h=rg(e),u=ag(e),d=og(e),f=jm(e),g=$m(s),_=i.createProgram();let p,m,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ps).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ps).join(`
`),m.length>0&&(m+=`
`)):(p=[zl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ps).join(`
`),m=[zl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Wn?"#define TONE_MAPPING":"",e.toneMapping!==Wn?Ft.tonemapping_pars_fragment:"",e.toneMapping!==Wn?qm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ft.colorspace_pars_fragment,Ym("linearToOutputTexel",e.outputColorSpace),Km(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ps).join(`
`)),a=po(a),a=kl(a,e),a=Gl(a,e),o=po(o),o=kl(o,e),o=Gl(o,e),a=Hl(a),o=Hl(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===sl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===sl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=y+p+a,M=y+m+o,C=Ol(i,i.VERTEX_SHADER,x),T=Ol(i,i.FRAGMENT_SHADER,M);i.attachShader(_,C),i.attachShader(_,T),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function w(b){if(r.debug.checkShaderErrors){const F=i.getProgramInfoLog(_).trim(),O=i.getShaderInfoLog(C).trim(),V=i.getShaderInfoLog(T).trim();let X=!0,z=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(X=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,C,T);else{const J=Bl(i,C,"vertex"),W=Bl(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+b.name+`
Material Type: `+b.type+`

Program Info Log: `+F+`
`+J+`
`+W)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(O===""||V==="")&&(z=!1);z&&(b.diagnostics={runnable:X,programLog:F,vertexShader:{log:O,prefix:p},fragmentShader:{log:V,prefix:m}})}i.deleteShader(C),i.deleteShader(T),P=new vr(i,_),U=Jm(i,_)}let P;this.getUniforms=function(){return P===void 0&&w(this),P};let U;this.getAttributes=function(){return U===void 0&&w(this),U};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=i.getProgramParameter(_,zm)),v},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Vm++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=T,this}let cg=0;class hg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new ug(t),e.set(t,n)),n}}class ug{constructor(t){this.id=cg++,this.code=t,this.usedTimes=0}}function dg(r,t,e,n,i,s,a){const o=new Do,l=new hg,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.reverseDepthBuffer,f=i.vertexTextures;let g=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(v){return c.add(v),v===0?"uv":`uv${v}`}function m(v,b,F,O,V){const X=O.fog,z=V.geometry,J=v.isMeshStandardMaterial?O.environment:null,W=(v.isMeshStandardMaterial?e:t).get(v.envMap||J),at=W&&W.mapping===Cr?W.image.height:null,ot=_[v.type];v.precision!==null&&(g=i.getMaxPrecision(v.precision),g!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",g,"instead."));const pt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Bt=pt!==void 0?pt.length:0;let Xt=0;z.morphAttributes.position!==void 0&&(Xt=1),z.morphAttributes.normal!==void 0&&(Xt=2),z.morphAttributes.color!==void 0&&(Xt=3);let q,et,gt,ht;if(ot){const Ne=hn[ot];q=Ne.vertexShader,et=Ne.fragmentShader}else q=v.vertexShader,et=v.fragmentShader,l.update(v),gt=l.getVertexShaderID(v),ht=l.getFragmentShaderID(v);const Rt=r.getRenderTarget(),At=V.isInstancedMesh===!0,kt=V.isBatchedMesh===!0,jt=!!v.map,Ht=!!v.matcap,L=!!W,Fe=!!v.aoMap,zt=!!v.lightMap,Yt=!!v.bumpMap,Pt=!!v.normalMap,le=!!v.displacementMap,Dt=!!v.emissiveMap,R=!!v.metalnessMap,S=!!v.roughnessMap,B=v.anisotropy>0,j=v.clearcoat>0,tt=v.dispersion>0,K=v.iridescence>0,St=v.sheen>0,rt=v.transmission>0,mt=B&&!!v.anisotropyMap,qt=j&&!!v.clearcoatMap,nt=j&&!!v.clearcoatNormalMap,_t=j&&!!v.clearcoatRoughnessMap,Lt=K&&!!v.iridescenceMap,It=K&&!!v.iridescenceThicknessMap,vt=St&&!!v.sheenColorMap,Vt=St&&!!v.sheenRoughnessMap,Ut=!!v.specularMap,re=!!v.specularColorMap,I=!!v.specularIntensityMap,ut=rt&&!!v.transmissionMap,Y=rt&&!!v.thicknessMap,Z=!!v.gradientMap,lt=!!v.alphaMap,dt=v.alphaTest>0,Wt=!!v.alphaHash,_e=!!v.extensions;let De=Wn;v.toneMapped&&(Rt===null||Rt.isXRRenderTarget===!0)&&(De=r.toneMapping);const $t={shaderID:ot,shaderType:v.type,shaderName:v.name,vertexShader:q,fragmentShader:et,defines:v.defines,customVertexShaderID:gt,customFragmentShaderID:ht,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:g,batching:kt,batchingColor:kt&&V._colorsTexture!==null,instancing:At,instancingColor:At&&V.instanceColor!==null,instancingMorph:At&&V.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:Rt===null?r.outputColorSpace:Rt.isXRRenderTarget===!0?Rt.texture.colorSpace:Ae,alphaToCoverage:!!v.alphaToCoverage,map:jt,matcap:Ht,envMap:L,envMapMode:L&&W.mapping,envMapCubeUVHeight:at,aoMap:Fe,lightMap:zt,bumpMap:Yt,normalMap:Pt,displacementMap:f&&le,emissiveMap:Dt,normalMapObjectSpace:Pt&&v.normalMapType===iu,normalMapTangentSpace:Pt&&v.normalMapType===zc,metalnessMap:R,roughnessMap:S,anisotropy:B,anisotropyMap:mt,clearcoat:j,clearcoatMap:qt,clearcoatNormalMap:nt,clearcoatRoughnessMap:_t,dispersion:tt,iridescence:K,iridescenceMap:Lt,iridescenceThicknessMap:It,sheen:St,sheenColorMap:vt,sheenRoughnessMap:Vt,specularMap:Ut,specularColorMap:re,specularIntensityMap:I,transmission:rt,transmissionMap:ut,thicknessMap:Y,gradientMap:Z,opaque:v.transparent===!1&&v.blending===Ui&&v.alphaToCoverage===!1,alphaMap:lt,alphaTest:dt,alphaHash:Wt,combine:v.combine,mapUv:jt&&p(v.map.channel),aoMapUv:Fe&&p(v.aoMap.channel),lightMapUv:zt&&p(v.lightMap.channel),bumpMapUv:Yt&&p(v.bumpMap.channel),normalMapUv:Pt&&p(v.normalMap.channel),displacementMapUv:le&&p(v.displacementMap.channel),emissiveMapUv:Dt&&p(v.emissiveMap.channel),metalnessMapUv:R&&p(v.metalnessMap.channel),roughnessMapUv:S&&p(v.roughnessMap.channel),anisotropyMapUv:mt&&p(v.anisotropyMap.channel),clearcoatMapUv:qt&&p(v.clearcoatMap.channel),clearcoatNormalMapUv:nt&&p(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_t&&p(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Lt&&p(v.iridescenceMap.channel),iridescenceThicknessMapUv:It&&p(v.iridescenceThicknessMap.channel),sheenColorMapUv:vt&&p(v.sheenColorMap.channel),sheenRoughnessMapUv:Vt&&p(v.sheenRoughnessMap.channel),specularMapUv:Ut&&p(v.specularMap.channel),specularColorMapUv:re&&p(v.specularColorMap.channel),specularIntensityMapUv:I&&p(v.specularIntensityMap.channel),transmissionMapUv:ut&&p(v.transmissionMap.channel),thicknessMapUv:Y&&p(v.thicknessMap.channel),alphaMapUv:lt&&p(v.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Pt||B),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!z.attributes.uv&&(jt||lt),fog:!!X,useFog:v.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:d,skinning:V.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:Bt,morphTextureStride:Xt,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:r.shadowMap.enabled&&F.length>0,shadowMapType:r.shadowMap.type,toneMapping:De,decodeVideoTexture:jt&&v.map.isVideoTexture===!0&&Kt.getTransfer(v.map.colorSpace)===ue,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===xe,flipSided:v.side===Ue,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:_e&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&v.extensions.multiDraw===!0||kt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return $t.vertexUv1s=c.has(1),$t.vertexUv2s=c.has(2),$t.vertexUv3s=c.has(3),c.clear(),$t}function y(v){const b=[];if(v.shaderID?b.push(v.shaderID):(b.push(v.customVertexShaderID),b.push(v.customFragmentShaderID)),v.defines!==void 0)for(const F in v.defines)b.push(F),b.push(v.defines[F]);return v.isRawShaderMaterial===!1&&(x(b,v),M(b,v),b.push(r.outputColorSpace)),b.push(v.customProgramCacheKey),b.join()}function x(v,b){v.push(b.precision),v.push(b.outputColorSpace),v.push(b.envMapMode),v.push(b.envMapCubeUVHeight),v.push(b.mapUv),v.push(b.alphaMapUv),v.push(b.lightMapUv),v.push(b.aoMapUv),v.push(b.bumpMapUv),v.push(b.normalMapUv),v.push(b.displacementMapUv),v.push(b.emissiveMapUv),v.push(b.metalnessMapUv),v.push(b.roughnessMapUv),v.push(b.anisotropyMapUv),v.push(b.clearcoatMapUv),v.push(b.clearcoatNormalMapUv),v.push(b.clearcoatRoughnessMapUv),v.push(b.iridescenceMapUv),v.push(b.iridescenceThicknessMapUv),v.push(b.sheenColorMapUv),v.push(b.sheenRoughnessMapUv),v.push(b.specularMapUv),v.push(b.specularColorMapUv),v.push(b.specularIntensityMapUv),v.push(b.transmissionMapUv),v.push(b.thicknessMapUv),v.push(b.combine),v.push(b.fogExp2),v.push(b.sizeAttenuation),v.push(b.morphTargetsCount),v.push(b.morphAttributeCount),v.push(b.numDirLights),v.push(b.numPointLights),v.push(b.numSpotLights),v.push(b.numSpotLightMaps),v.push(b.numHemiLights),v.push(b.numRectAreaLights),v.push(b.numDirLightShadows),v.push(b.numPointLightShadows),v.push(b.numSpotLightShadows),v.push(b.numSpotLightShadowsWithMaps),v.push(b.numLightProbes),v.push(b.shadowMapType),v.push(b.toneMapping),v.push(b.numClippingPlanes),v.push(b.numClipIntersection),v.push(b.depthPacking)}function M(v,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),v.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reverseDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.alphaToCoverage&&o.enable(20),v.push(o.mask)}function C(v){const b=_[v.type];let F;if(b){const O=hn[b];F=Ku.clone(O.uniforms)}else F=v.uniforms;return F}function T(v,b){let F;for(let O=0,V=h.length;O<V;O++){const X=h[O];if(X.cacheKey===b){F=X,++F.usedTimes;break}}return F===void 0&&(F=new lg(r,b,v,s),h.push(F)),F}function w(v){if(--v.usedTimes===0){const b=h.indexOf(v);h[b]=h[h.length-1],h.pop(),v.destroy()}}function P(v){l.remove(v)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:y,getUniforms:C,acquireProgram:T,releaseProgram:w,releaseShaderCache:P,programs:h,dispose:U}}function fg(){let r=new WeakMap;function t(a){return r.has(a)}function e(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function pg(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function Vl(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Wl(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function a(u,d,f,g,_,p){let m=r[t];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:p},r[t]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=g,m.renderOrder=u.renderOrder,m.z=_,m.group=p),t++,m}function o(u,d,f,g,_,p){const m=a(u,d,f,g,_,p);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):e.push(m)}function l(u,d,f,g,_,p){const m=a(u,d,f,g,_,p);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):e.unshift(m)}function c(u,d){e.length>1&&e.sort(u||pg),n.length>1&&n.sort(d||Vl),i.length>1&&i.sort(d||Vl)}function h(){for(let u=t,d=r.length;u<d;u++){const f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:o,unshift:l,finish:h,sort:c}}function mg(){let r=new WeakMap;function t(n,i){const s=r.get(n);let a;return s===void 0?(a=new Wl,r.set(n,[a])):i>=s.length?(a=new Wl,s.push(a)):a=s[i],a}function e(){r=new WeakMap}return{get:t,dispose:e}}function gg(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new A,color:new yt};break;case"SpotLight":e={position:new A,direction:new A,color:new yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new A,color:new yt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new A,skyColor:new yt,groundColor:new yt};break;case"RectAreaLight":e={color:new yt,position:new A,halfWidth:new A,halfHeight:new A};break}return r[t.id]=e,e}}}function _g(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let vg=0;function xg(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function yg(r){const t=new gg,e=_g(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new A);const i=new A,s=new Nt,a=new Nt;function o(c){let h=0,u=0,d=0;for(let U=0;U<9;U++)n.probe[U].set(0,0,0);let f=0,g=0,_=0,p=0,m=0,y=0,x=0,M=0,C=0,T=0,w=0;c.sort(xg);for(let U=0,v=c.length;U<v;U++){const b=c[U],F=b.color,O=b.intensity,V=b.distance,X=b.shadow&&b.shadow.map?b.shadow.map.texture:null;if(b.isAmbientLight)h+=F.r*O,u+=F.g*O,d+=F.b*O;else if(b.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(b.sh.coefficients[z],O);w++}else if(b.isDirectionalLight){const z=t.get(b);if(z.color.copy(b.color).multiplyScalar(b.intensity),b.castShadow){const J=b.shadow,W=e.get(b);W.shadowIntensity=J.intensity,W.shadowBias=J.bias,W.shadowNormalBias=J.normalBias,W.shadowRadius=J.radius,W.shadowMapSize=J.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=X,n.directionalShadowMatrix[f]=b.shadow.matrix,y++}n.directional[f]=z,f++}else if(b.isSpotLight){const z=t.get(b);z.position.setFromMatrixPosition(b.matrixWorld),z.color.copy(F).multiplyScalar(O),z.distance=V,z.coneCos=Math.cos(b.angle),z.penumbraCos=Math.cos(b.angle*(1-b.penumbra)),z.decay=b.decay,n.spot[_]=z;const J=b.shadow;if(b.map&&(n.spotLightMap[C]=b.map,C++,J.updateMatrices(b),b.castShadow&&T++),n.spotLightMatrix[_]=J.matrix,b.castShadow){const W=e.get(b);W.shadowIntensity=J.intensity,W.shadowBias=J.bias,W.shadowNormalBias=J.normalBias,W.shadowRadius=J.radius,W.shadowMapSize=J.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=X,M++}_++}else if(b.isRectAreaLight){const z=t.get(b);z.color.copy(F).multiplyScalar(O),z.halfWidth.set(b.width*.5,0,0),z.halfHeight.set(0,b.height*.5,0),n.rectArea[p]=z,p++}else if(b.isPointLight){const z=t.get(b);if(z.color.copy(b.color).multiplyScalar(b.intensity),z.distance=b.distance,z.decay=b.decay,b.castShadow){const J=b.shadow,W=e.get(b);W.shadowIntensity=J.intensity,W.shadowBias=J.bias,W.shadowNormalBias=J.normalBias,W.shadowRadius=J.radius,W.shadowMapSize=J.mapSize,W.shadowCameraNear=J.camera.near,W.shadowCameraFar=J.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=b.shadow.matrix,x++}n.point[g]=z,g++}else if(b.isHemisphereLight){const z=t.get(b);z.skyColor.copy(b.color).multiplyScalar(O),z.groundColor.copy(b.groundColor).multiplyScalar(O),n.hemi[m]=z,m++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=st.LTC_FLOAT_1,n.rectAreaLTC2=st.LTC_FLOAT_2):(n.rectAreaLTC1=st.LTC_HALF_1,n.rectAreaLTC2=st.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const P=n.hash;(P.directionalLength!==f||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==p||P.hemiLength!==m||P.numDirectionalShadows!==y||P.numPointShadows!==x||P.numSpotShadows!==M||P.numSpotMaps!==C||P.numLightProbes!==w)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=M+C-T,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=w,P.directionalLength=f,P.pointLength=g,P.spotLength=_,P.rectAreaLength=p,P.hemiLength=m,P.numDirectionalShadows=y,P.numPointShadows=x,P.numSpotShadows=M,P.numSpotMaps=C,P.numLightProbes=w,n.version=vg++)}function l(c,h){let u=0,d=0,f=0,g=0,_=0;const p=h.matrixWorldInverse;for(let m=0,y=c.length;m<y;m++){const x=c[m];if(x.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(p),u++}else if(x.isSpotLight){const M=n.spot[f];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(p),f++}else if(x.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(p),a.identity(),s.copy(x.matrixWorld),s.premultiply(p),a.extractRotation(s),M.halfWidth.set(x.width*.5,0,0),M.halfHeight.set(0,x.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(x.isPointLight){const M=n.point[d];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(p),d++}else if(x.isHemisphereLight){const M=n.hemi[_];M.direction.setFromMatrixPosition(x.matrixWorld),M.direction.transformDirection(p),_++}}}return{setup:o,setupView:l,state:n}}function Xl(r){const t=new yg(r),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function Mg(r){let t=new WeakMap;function e(i,s=0){const a=t.get(i);let o;return a===void 0?(o=new Xl(r),t.set(i,[o])):s>=a.length?(o=new Xl(r),a.push(o)):o=a[s],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class Sg extends ln{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=eu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class bg extends ln{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Eg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,wg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Ag(r,t,e){let n=new No;const i=new ft,s=new ft,a=new Jt,o=new Sg({depthPacking:nu}),l=new bg,c={},h=e.maxTextureSize,u={[Tn]:Ue,[Ue]:Tn,[xe]:xe},d=new Yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ft},radius:{value:4}},vertexShader:Eg,fragmentShader:wg}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new de;g.setAttribute("position",new ge(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new wt(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ec;let m=this.type;this.render=function(T,w,P){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;const U=r.getRenderTarget(),v=r.getActiveCubeFace(),b=r.getActiveMipmapLevel(),F=r.state;F.setBlending(Vn),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const O=m!==bn&&this.type===bn,V=m===bn&&this.type!==bn;for(let X=0,z=T.length;X<z;X++){const J=T[X],W=J.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);const at=W.getFrameExtents();if(i.multiply(at),s.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/at.x),i.x=s.x*at.x,W.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/at.y),i.y=s.y*at.y,W.mapSize.y=s.y)),W.map===null||O===!0||V===!0){const pt=this.type!==bn?{minFilter:Ie,magFilter:Ie}:{};W.map!==null&&W.map.dispose(),W.map=new ci(i.x,i.y,pt),W.map.texture.name=J.name+".shadowMap",W.camera.updateProjectionMatrix()}r.setRenderTarget(W.map),r.clear();const ot=W.getViewportCount();for(let pt=0;pt<ot;pt++){const Bt=W.getViewport(pt);a.set(s.x*Bt.x,s.y*Bt.y,s.x*Bt.z,s.y*Bt.w),F.viewport(a),W.updateMatrices(J,pt),n=W.getFrustum(),M(w,P,W.camera,J,this.type)}W.isPointLightShadow!==!0&&this.type===bn&&y(W,P),W.needsUpdate=!1}m=this.type,p.needsUpdate=!1,r.setRenderTarget(U,v,b)};function y(T,w){const P=t.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new ci(i.x,i.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,r.setRenderTarget(T.mapPass),r.clear(),r.renderBufferDirect(w,null,P,d,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,r.setRenderTarget(T.map),r.clear(),r.renderBufferDirect(w,null,P,f,_,null)}function x(T,w,P,U){let v=null;const b=P.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(b!==void 0)v=b;else if(v=P.isPointLight===!0?l:o,r.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const F=v.uuid,O=w.uuid;let V=c[F];V===void 0&&(V={},c[F]=V);let X=V[O];X===void 0&&(X=v.clone(),V[O]=X,w.addEventListener("dispose",C)),v=X}if(v.visible=w.visible,v.wireframe=w.wireframe,U===bn?v.side=w.shadowSide!==null?w.shadowSide:w.side:v.side=w.shadowSide!==null?w.shadowSide:u[w.side],v.alphaMap=w.alphaMap,v.alphaTest=w.alphaTest,v.map=w.map,v.clipShadows=w.clipShadows,v.clippingPlanes=w.clippingPlanes,v.clipIntersection=w.clipIntersection,v.displacementMap=w.displacementMap,v.displacementScale=w.displacementScale,v.displacementBias=w.displacementBias,v.wireframeLinewidth=w.wireframeLinewidth,v.linewidth=w.linewidth,P.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const F=r.properties.get(v);F.light=P}return v}function M(T,w,P,U,v){if(T.visible===!1)return;if(T.layers.test(w.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&v===bn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,T.matrixWorld);const O=t.update(T),V=T.material;if(Array.isArray(V)){const X=O.groups;for(let z=0,J=X.length;z<J;z++){const W=X[z],at=V[W.materialIndex];if(at&&at.visible){const ot=x(T,at,U,v);T.onBeforeShadow(r,T,w,P,O,ot,W),r.renderBufferDirect(P,null,O,ot,T,W),T.onAfterShadow(r,T,w,P,O,ot,W)}}}else if(V.visible){const X=x(T,V,U,v);T.onBeforeShadow(r,T,w,P,O,X,null),r.renderBufferDirect(P,null,O,X,T,null),T.onAfterShadow(r,T,w,P,O,X,null)}}const F=T.children;for(let O=0,V=F.length;O<V;O++)M(F[O],w,P,U,v)}function C(T){T.target.removeEventListener("dispose",C);for(const P in c){const U=c[P],v=T.target.uuid;v in U&&(U[v].dispose(),delete U[v])}}}const Tg={[Pa]:La,[Ia]:Ua,[Da]:Fa,[ki]:Na,[La]:Pa,[Ua]:Ia,[Fa]:Da,[Na]:ki};function Rg(r){function t(){let I=!1;const ut=new Jt;let Y=null;const Z=new Jt(0,0,0,0);return{setMask:function(lt){Y!==lt&&!I&&(r.colorMask(lt,lt,lt,lt),Y=lt)},setLocked:function(lt){I=lt},setClear:function(lt,dt,Wt,_e,De){De===!0&&(lt*=_e,dt*=_e,Wt*=_e),ut.set(lt,dt,Wt,_e),Z.equals(ut)===!1&&(r.clearColor(lt,dt,Wt,_e),Z.copy(ut))},reset:function(){I=!1,Y=null,Z.set(-1,0,0,0)}}}function e(){let I=!1,ut=!1,Y=null,Z=null,lt=null;return{setReversed:function(dt){ut=dt},setTest:function(dt){dt?gt(r.DEPTH_TEST):ht(r.DEPTH_TEST)},setMask:function(dt){Y!==dt&&!I&&(r.depthMask(dt),Y=dt)},setFunc:function(dt){if(ut&&(dt=Tg[dt]),Z!==dt){switch(dt){case Pa:r.depthFunc(r.NEVER);break;case La:r.depthFunc(r.ALWAYS);break;case Ia:r.depthFunc(r.LESS);break;case ki:r.depthFunc(r.LEQUAL);break;case Da:r.depthFunc(r.EQUAL);break;case Na:r.depthFunc(r.GEQUAL);break;case Ua:r.depthFunc(r.GREATER);break;case Fa:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Z=dt}},setLocked:function(dt){I=dt},setClear:function(dt){lt!==dt&&(r.clearDepth(dt),lt=dt)},reset:function(){I=!1,Y=null,Z=null,lt=null}}}function n(){let I=!1,ut=null,Y=null,Z=null,lt=null,dt=null,Wt=null,_e=null,De=null;return{setTest:function($t){I||($t?gt(r.STENCIL_TEST):ht(r.STENCIL_TEST))},setMask:function($t){ut!==$t&&!I&&(r.stencilMask($t),ut=$t)},setFunc:function($t,Ne,gn){(Y!==$t||Z!==Ne||lt!==gn)&&(r.stencilFunc($t,Ne,gn),Y=$t,Z=Ne,lt=gn)},setOp:function($t,Ne,gn){(dt!==$t||Wt!==Ne||_e!==gn)&&(r.stencilOp($t,Ne,gn),dt=$t,Wt=Ne,_e=gn)},setLocked:function($t){I=$t},setClear:function($t){De!==$t&&(r.clearStencil($t),De=$t)},reset:function(){I=!1,ut=null,Y=null,Z=null,lt=null,dt=null,Wt=null,_e=null,De=null}}}const i=new t,s=new e,a=new n,o=new WeakMap,l=new WeakMap;let c={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,p=null,m=null,y=null,x=null,M=null,C=null,T=new yt(0,0,0),w=0,P=!1,U=null,v=null,b=null,F=null,O=null;const V=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,z=0;const J=r.getParameter(r.VERSION);J.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(J)[1]),X=z>=1):J.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),X=z>=2);let W=null,at={};const ot=r.getParameter(r.SCISSOR_BOX),pt=r.getParameter(r.VIEWPORT),Bt=new Jt().fromArray(ot),Xt=new Jt().fromArray(pt);function q(I,ut,Y,Z){const lt=new Uint8Array(4),dt=r.createTexture();r.bindTexture(I,dt),r.texParameteri(I,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(I,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Wt=0;Wt<Y;Wt++)I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY?r.texImage3D(ut,0,r.RGBA,1,1,Z,0,r.RGBA,r.UNSIGNED_BYTE,lt):r.texImage2D(ut+Wt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,lt);return dt}const et={};et[r.TEXTURE_2D]=q(r.TEXTURE_2D,r.TEXTURE_2D,1),et[r.TEXTURE_CUBE_MAP]=q(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),et[r.TEXTURE_2D_ARRAY]=q(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),et[r.TEXTURE_3D]=q(r.TEXTURE_3D,r.TEXTURE_3D,1,1),i.setClear(0,0,0,1),s.setClear(1),a.setClear(0),gt(r.DEPTH_TEST),s.setFunc(ki),zt(!1),Yt(Qo),gt(r.CULL_FACE),L(Vn);function gt(I){c[I]!==!0&&(r.enable(I),c[I]=!0)}function ht(I){c[I]!==!1&&(r.disable(I),c[I]=!1)}function Rt(I,ut){return h[I]!==ut?(r.bindFramebuffer(I,ut),h[I]=ut,I===r.DRAW_FRAMEBUFFER&&(h[r.FRAMEBUFFER]=ut),I===r.FRAMEBUFFER&&(h[r.DRAW_FRAMEBUFFER]=ut),!0):!1}function At(I,ut){let Y=d,Z=!1;if(I){Y=u.get(ut),Y===void 0&&(Y=[],u.set(ut,Y));const lt=I.textures;if(Y.length!==lt.length||Y[0]!==r.COLOR_ATTACHMENT0){for(let dt=0,Wt=lt.length;dt<Wt;dt++)Y[dt]=r.COLOR_ATTACHMENT0+dt;Y.length=lt.length,Z=!0}}else Y[0]!==r.BACK&&(Y[0]=r.BACK,Z=!0);Z&&r.drawBuffers(Y)}function kt(I){return f!==I?(r.useProgram(I),f=I,!0):!1}const jt={[ii]:r.FUNC_ADD,[Ah]:r.FUNC_SUBTRACT,[Th]:r.FUNC_REVERSE_SUBTRACT};jt[Rh]=r.MIN,jt[Ch]=r.MAX;const Ht={[Ph]:r.ZERO,[Lh]:r.ONE,[Ih]:r.SRC_COLOR,[Ra]:r.SRC_ALPHA,[Bh]:r.SRC_ALPHA_SATURATE,[Fh]:r.DST_COLOR,[Nh]:r.DST_ALPHA,[Dh]:r.ONE_MINUS_SRC_COLOR,[Ca]:r.ONE_MINUS_SRC_ALPHA,[Oh]:r.ONE_MINUS_DST_COLOR,[Uh]:r.ONE_MINUS_DST_ALPHA,[kh]:r.CONSTANT_COLOR,[Gh]:r.ONE_MINUS_CONSTANT_COLOR,[Hh]:r.CONSTANT_ALPHA,[zh]:r.ONE_MINUS_CONSTANT_ALPHA};function L(I,ut,Y,Z,lt,dt,Wt,_e,De,$t){if(I===Vn){g===!0&&(ht(r.BLEND),g=!1);return}if(g===!1&&(gt(r.BLEND),g=!0),I!==wh){if(I!==_||$t!==P){if((p!==ii||x!==ii)&&(r.blendEquation(r.FUNC_ADD),p=ii,x=ii),$t)switch(I){case Ui:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case he:r.blendFunc(r.ONE,r.ONE);break;case tl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case el:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Ui:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case he:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case tl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case el:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}m=null,y=null,M=null,C=null,T.set(0,0,0),w=0,_=I,P=$t}return}lt=lt||ut,dt=dt||Y,Wt=Wt||Z,(ut!==p||lt!==x)&&(r.blendEquationSeparate(jt[ut],jt[lt]),p=ut,x=lt),(Y!==m||Z!==y||dt!==M||Wt!==C)&&(r.blendFuncSeparate(Ht[Y],Ht[Z],Ht[dt],Ht[Wt]),m=Y,y=Z,M=dt,C=Wt),(_e.equals(T)===!1||De!==w)&&(r.blendColor(_e.r,_e.g,_e.b,De),T.copy(_e),w=De),_=I,P=!1}function Fe(I,ut){I.side===xe?ht(r.CULL_FACE):gt(r.CULL_FACE);let Y=I.side===Ue;ut&&(Y=!Y),zt(Y),I.blending===Ui&&I.transparent===!1?L(Vn):L(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),s.setFunc(I.depthFunc),s.setTest(I.depthTest),s.setMask(I.depthWrite),i.setMask(I.colorWrite);const Z=I.stencilWrite;a.setTest(Z),Z&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),le(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?gt(r.SAMPLE_ALPHA_TO_COVERAGE):ht(r.SAMPLE_ALPHA_TO_COVERAGE)}function zt(I){U!==I&&(I?r.frontFace(r.CW):r.frontFace(r.CCW),U=I)}function Yt(I){I!==bh?(gt(r.CULL_FACE),I!==v&&(I===Qo?r.cullFace(r.BACK):I===Eh?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ht(r.CULL_FACE),v=I}function Pt(I){I!==b&&(X&&r.lineWidth(I),b=I)}function le(I,ut,Y){I?(gt(r.POLYGON_OFFSET_FILL),(F!==ut||O!==Y)&&(r.polygonOffset(ut,Y),F=ut,O=Y)):ht(r.POLYGON_OFFSET_FILL)}function Dt(I){I?gt(r.SCISSOR_TEST):ht(r.SCISSOR_TEST)}function R(I){I===void 0&&(I=r.TEXTURE0+V-1),W!==I&&(r.activeTexture(I),W=I)}function S(I,ut,Y){Y===void 0&&(W===null?Y=r.TEXTURE0+V-1:Y=W);let Z=at[Y];Z===void 0&&(Z={type:void 0,texture:void 0},at[Y]=Z),(Z.type!==I||Z.texture!==ut)&&(W!==Y&&(r.activeTexture(Y),W=Y),r.bindTexture(I,ut||et[I]),Z.type=I,Z.texture=ut)}function B(){const I=at[W];I!==void 0&&I.type!==void 0&&(r.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function j(){try{r.compressedTexImage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function tt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function K(){try{r.texSubImage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function St(){try{r.texSubImage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function rt(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function mt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function qt(){try{r.texStorage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function nt(){try{r.texStorage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function _t(){try{r.texImage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Lt(){try{r.texImage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function It(I){Bt.equals(I)===!1&&(r.scissor(I.x,I.y,I.z,I.w),Bt.copy(I))}function vt(I){Xt.equals(I)===!1&&(r.viewport(I.x,I.y,I.z,I.w),Xt.copy(I))}function Vt(I,ut){let Y=l.get(ut);Y===void 0&&(Y=new WeakMap,l.set(ut,Y));let Z=Y.get(I);Z===void 0&&(Z=r.getUniformBlockIndex(ut,I.name),Y.set(I,Z))}function Ut(I,ut){const Z=l.get(ut).get(I);o.get(ut)!==Z&&(r.uniformBlockBinding(ut,Z,I.__bindingPointIndex),o.set(ut,Z))}function re(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),c={},W=null,at={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,p=null,m=null,y=null,x=null,M=null,C=null,T=new yt(0,0,0),w=0,P=!1,U=null,v=null,b=null,F=null,O=null,Bt.set(0,0,r.canvas.width,r.canvas.height),Xt.set(0,0,r.canvas.width,r.canvas.height),i.reset(),s.reset(),a.reset()}return{buffers:{color:i,depth:s,stencil:a},enable:gt,disable:ht,bindFramebuffer:Rt,drawBuffers:At,useProgram:kt,setBlending:L,setMaterial:Fe,setFlipSided:zt,setCullFace:Yt,setLineWidth:Pt,setPolygonOffset:le,setScissorTest:Dt,activeTexture:R,bindTexture:S,unbindTexture:B,compressedTexImage2D:j,compressedTexImage3D:tt,texImage2D:_t,texImage3D:Lt,updateUBOMapping:Vt,uniformBlockBinding:Ut,texStorage2D:qt,texStorage3D:nt,texSubImage2D:K,texSubImage3D:St,compressedTexSubImage2D:rt,compressedTexSubImage3D:mt,scissor:It,viewport:vt,reset:re}}function Yl(r,t,e,n){const i=Cg(n);switch(e){case Dc:return r*t;case Uc:return r*t;case Fc:return r*t*2;case Ao:return r*t/i.components*i.byteLength;case To:return r*t/i.components*i.byteLength;case Oc:return r*t*2/i.components*i.byteLength;case Ro:return r*t*2/i.components*i.byteLength;case Nc:return r*t*3/i.components*i.byteLength;case Ke:return r*t*4/i.components*i.byteLength;case Co:return r*t*4/i.components*i.byteLength;case dr:case fr:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case pr:case mr:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ga:case za:return Math.max(r,16)*Math.max(t,8)/4;case ka:case Ha:return Math.max(r,8)*Math.max(t,8)/2;case Va:case Wa:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Xa:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ya:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case qa:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Ka:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case ja:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case $a:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Ja:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Za:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Qa:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case to:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case eo:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case no:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case io:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case so:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case ro:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case gr:case ao:case oo:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Bc:case lo:return Math.ceil(r/4)*Math.ceil(t/4)*8;case co:case ho:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Cg(r){switch(r){case Rn:case Pc:return{byteLength:1,components:1};case Ms:case Lc:case Ts:return{byteLength:2,components:1};case Eo:case wo:return{byteLength:2,components:4};case li:case bo:case rn:return{byteLength:4,components:1};case Ic:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function Pg(r,t,e,n,i,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ft,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,S){return f?new OffscreenCanvas(R,S):Es("canvas")}function _(R,S,B){let j=1;const tt=Dt(R);if((tt.width>B||tt.height>B)&&(j=B/Math.max(tt.width,tt.height)),j<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const K=Math.floor(j*tt.width),St=Math.floor(j*tt.height);u===void 0&&(u=g(K,St));const rt=S?g(K,St):u;return rt.width=K,rt.height=St,rt.getContext("2d").drawImage(R,0,0,K,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+K+"x"+St+")."),rt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),R;return R}function p(R){return R.generateMipmaps&&R.minFilter!==Ie&&R.minFilter!==ze}function m(R){r.generateMipmap(R)}function y(R,S,B,j,tt=!1){if(R!==null){if(r[R]!==void 0)return r[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let K=S;if(S===r.RED&&(B===r.FLOAT&&(K=r.R32F),B===r.HALF_FLOAT&&(K=r.R16F),B===r.UNSIGNED_BYTE&&(K=r.R8)),S===r.RED_INTEGER&&(B===r.UNSIGNED_BYTE&&(K=r.R8UI),B===r.UNSIGNED_SHORT&&(K=r.R16UI),B===r.UNSIGNED_INT&&(K=r.R32UI),B===r.BYTE&&(K=r.R8I),B===r.SHORT&&(K=r.R16I),B===r.INT&&(K=r.R32I)),S===r.RG&&(B===r.FLOAT&&(K=r.RG32F),B===r.HALF_FLOAT&&(K=r.RG16F),B===r.UNSIGNED_BYTE&&(K=r.RG8)),S===r.RG_INTEGER&&(B===r.UNSIGNED_BYTE&&(K=r.RG8UI),B===r.UNSIGNED_SHORT&&(K=r.RG16UI),B===r.UNSIGNED_INT&&(K=r.RG32UI),B===r.BYTE&&(K=r.RG8I),B===r.SHORT&&(K=r.RG16I),B===r.INT&&(K=r.RG32I)),S===r.RGB_INTEGER&&(B===r.UNSIGNED_BYTE&&(K=r.RGB8UI),B===r.UNSIGNED_SHORT&&(K=r.RGB16UI),B===r.UNSIGNED_INT&&(K=r.RGB32UI),B===r.BYTE&&(K=r.RGB8I),B===r.SHORT&&(K=r.RGB16I),B===r.INT&&(K=r.RGB32I)),S===r.RGBA_INTEGER&&(B===r.UNSIGNED_BYTE&&(K=r.RGBA8UI),B===r.UNSIGNED_SHORT&&(K=r.RGBA16UI),B===r.UNSIGNED_INT&&(K=r.RGBA32UI),B===r.BYTE&&(K=r.RGBA8I),B===r.SHORT&&(K=r.RGBA16I),B===r.INT&&(K=r.RGBA32I)),S===r.RGB&&B===r.UNSIGNED_INT_5_9_9_9_REV&&(K=r.RGB9_E5),S===r.RGBA){const St=tt?Mr:Kt.getTransfer(j);B===r.FLOAT&&(K=r.RGBA32F),B===r.HALF_FLOAT&&(K=r.RGBA16F),B===r.UNSIGNED_BYTE&&(K=St===ue?r.SRGB8_ALPHA8:r.RGBA8),B===r.UNSIGNED_SHORT_4_4_4_4&&(K=r.RGBA4),B===r.UNSIGNED_SHORT_5_5_5_1&&(K=r.RGB5_A1)}return(K===r.R16F||K===r.R32F||K===r.RG16F||K===r.RG32F||K===r.RGBA16F||K===r.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function x(R,S){let B;return R?S===null||S===li||S===zi?B=r.DEPTH24_STENCIL8:S===rn?B=r.DEPTH32F_STENCIL8:S===Ms&&(B=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===li||S===zi?B=r.DEPTH_COMPONENT24:S===rn?B=r.DEPTH_COMPONENT32F:S===Ms&&(B=r.DEPTH_COMPONENT16),B}function M(R,S){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==Ie&&R.minFilter!==ze?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function C(R){const S=R.target;S.removeEventListener("dispose",C),w(S),S.isVideoTexture&&h.delete(S)}function T(R){const S=R.target;S.removeEventListener("dispose",T),U(S)}function w(R){const S=n.get(R);if(S.__webglInit===void 0)return;const B=R.source,j=d.get(B);if(j){const tt=j[S.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&P(R),Object.keys(j).length===0&&d.delete(B)}n.remove(R)}function P(R){const S=n.get(R);r.deleteTexture(S.__webglTexture);const B=R.source,j=d.get(B);delete j[S.__cacheKey],a.memory.textures--}function U(R){const S=n.get(R);if(R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(S.__webglFramebuffer[j]))for(let tt=0;tt<S.__webglFramebuffer[j].length;tt++)r.deleteFramebuffer(S.__webglFramebuffer[j][tt]);else r.deleteFramebuffer(S.__webglFramebuffer[j]);S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer[j])}else{if(Array.isArray(S.__webglFramebuffer))for(let j=0;j<S.__webglFramebuffer.length;j++)r.deleteFramebuffer(S.__webglFramebuffer[j]);else r.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&r.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let j=0;j<S.__webglColorRenderbuffer.length;j++)S.__webglColorRenderbuffer[j]&&r.deleteRenderbuffer(S.__webglColorRenderbuffer[j]);S.__webglDepthRenderbuffer&&r.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const B=R.textures;for(let j=0,tt=B.length;j<tt;j++){const K=n.get(B[j]);K.__webglTexture&&(r.deleteTexture(K.__webglTexture),a.memory.textures--),n.remove(B[j])}n.remove(R)}let v=0;function b(){v=0}function F(){const R=v;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),v+=1,R}function O(R){const S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function V(R,S){const B=n.get(R);if(R.isVideoTexture&&Pt(R),R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){const j=R.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Xt(B,R,S);return}}e.bindTexture(r.TEXTURE_2D,B.__webglTexture,r.TEXTURE0+S)}function X(R,S){const B=n.get(R);if(R.version>0&&B.__version!==R.version){Xt(B,R,S);return}e.bindTexture(r.TEXTURE_2D_ARRAY,B.__webglTexture,r.TEXTURE0+S)}function z(R,S){const B=n.get(R);if(R.version>0&&B.__version!==R.version){Xt(B,R,S);return}e.bindTexture(r.TEXTURE_3D,B.__webglTexture,r.TEXTURE0+S)}function J(R,S){const B=n.get(R);if(R.version>0&&B.__version!==R.version){q(B,R,S);return}e.bindTexture(r.TEXTURE_CUBE_MAP,B.__webglTexture,r.TEXTURE0+S)}const W={[Xn]:r.REPEAT,[Hn]:r.CLAMP_TO_EDGE,[xr]:r.MIRRORED_REPEAT},at={[Ie]:r.NEAREST,[Cc]:r.NEAREST_MIPMAP_NEAREST,[fs]:r.NEAREST_MIPMAP_LINEAR,[ze]:r.LINEAR,[ur]:r.LINEAR_MIPMAP_NEAREST,[wn]:r.LINEAR_MIPMAP_LINEAR},ot={[su]:r.NEVER,[hu]:r.ALWAYS,[ru]:r.LESS,[Vc]:r.LEQUAL,[au]:r.EQUAL,[cu]:r.GEQUAL,[ou]:r.GREATER,[lu]:r.NOTEQUAL};function pt(R,S){if(S.type===rn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===ze||S.magFilter===ur||S.magFilter===fs||S.magFilter===wn||S.minFilter===ze||S.minFilter===ur||S.minFilter===fs||S.minFilter===wn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(R,r.TEXTURE_WRAP_S,W[S.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,W[S.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,W[S.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,at[S.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,at[S.minFilter]),S.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,ot[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Ie||S.minFilter!==fs&&S.minFilter!==wn||S.type===rn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");r.texParameterf(R,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Bt(R,S){let B=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",C));const j=S.source;let tt=d.get(j);tt===void 0&&(tt={},d.set(j,tt));const K=O(S);if(K!==R.__cacheKey){tt[K]===void 0&&(tt[K]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,B=!0),tt[K].usedTimes++;const St=tt[R.__cacheKey];St!==void 0&&(tt[R.__cacheKey].usedTimes--,St.usedTimes===0&&P(S)),R.__cacheKey=K,R.__webglTexture=tt[K].texture}return B}function Xt(R,S,B){let j=r.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(j=r.TEXTURE_2D_ARRAY),S.isData3DTexture&&(j=r.TEXTURE_3D);const tt=Bt(R,S),K=S.source;e.bindTexture(j,R.__webglTexture,r.TEXTURE0+B);const St=n.get(K);if(K.version!==St.__version||tt===!0){e.activeTexture(r.TEXTURE0+B);const rt=Kt.getPrimaries(Kt.workingColorSpace),mt=S.colorSpace===kn?null:Kt.getPrimaries(S.colorSpace),qt=S.colorSpace===kn||rt===mt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,qt);let nt=_(S.image,!1,i.maxTextureSize);nt=le(S,nt);const _t=s.convert(S.format,S.colorSpace),Lt=s.convert(S.type);let It=y(S.internalFormat,_t,Lt,S.colorSpace,S.isVideoTexture);pt(j,S);let vt;const Vt=S.mipmaps,Ut=S.isVideoTexture!==!0,re=St.__version===void 0||tt===!0,I=K.dataReady,ut=M(S,nt);if(S.isDepthTexture)It=x(S.format===Vi,S.type),re&&(Ut?e.texStorage2D(r.TEXTURE_2D,1,It,nt.width,nt.height):e.texImage2D(r.TEXTURE_2D,0,It,nt.width,nt.height,0,_t,Lt,null));else if(S.isDataTexture)if(Vt.length>0){Ut&&re&&e.texStorage2D(r.TEXTURE_2D,ut,It,Vt[0].width,Vt[0].height);for(let Y=0,Z=Vt.length;Y<Z;Y++)vt=Vt[Y],Ut?I&&e.texSubImage2D(r.TEXTURE_2D,Y,0,0,vt.width,vt.height,_t,Lt,vt.data):e.texImage2D(r.TEXTURE_2D,Y,It,vt.width,vt.height,0,_t,Lt,vt.data);S.generateMipmaps=!1}else Ut?(re&&e.texStorage2D(r.TEXTURE_2D,ut,It,nt.width,nt.height),I&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,nt.width,nt.height,_t,Lt,nt.data)):e.texImage2D(r.TEXTURE_2D,0,It,nt.width,nt.height,0,_t,Lt,nt.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ut&&re&&e.texStorage3D(r.TEXTURE_2D_ARRAY,ut,It,Vt[0].width,Vt[0].height,nt.depth);for(let Y=0,Z=Vt.length;Y<Z;Y++)if(vt=Vt[Y],S.format!==Ke)if(_t!==null)if(Ut){if(I)if(S.layerUpdates.size>0){const lt=Yl(vt.width,vt.height,S.format,S.type);for(const dt of S.layerUpdates){const Wt=vt.data.subarray(dt*lt/vt.data.BYTES_PER_ELEMENT,(dt+1)*lt/vt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,dt,vt.width,vt.height,1,_t,Wt,0,0)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,0,vt.width,vt.height,nt.depth,_t,vt.data,0,0)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Y,It,vt.width,vt.height,nt.depth,0,vt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ut?I&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,0,vt.width,vt.height,nt.depth,_t,Lt,vt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,Y,It,vt.width,vt.height,nt.depth,0,_t,Lt,vt.data)}else{Ut&&re&&e.texStorage2D(r.TEXTURE_2D,ut,It,Vt[0].width,Vt[0].height);for(let Y=0,Z=Vt.length;Y<Z;Y++)vt=Vt[Y],S.format!==Ke?_t!==null?Ut?I&&e.compressedTexSubImage2D(r.TEXTURE_2D,Y,0,0,vt.width,vt.height,_t,vt.data):e.compressedTexImage2D(r.TEXTURE_2D,Y,It,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ut?I&&e.texSubImage2D(r.TEXTURE_2D,Y,0,0,vt.width,vt.height,_t,Lt,vt.data):e.texImage2D(r.TEXTURE_2D,Y,It,vt.width,vt.height,0,_t,Lt,vt.data)}else if(S.isDataArrayTexture)if(Ut){if(re&&e.texStorage3D(r.TEXTURE_2D_ARRAY,ut,It,nt.width,nt.height,nt.depth),I)if(S.layerUpdates.size>0){const Y=Yl(nt.width,nt.height,S.format,S.type);for(const Z of S.layerUpdates){const lt=nt.data.subarray(Z*Y/nt.data.BYTES_PER_ELEMENT,(Z+1)*Y/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Z,nt.width,nt.height,1,_t,Lt,lt)}S.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,_t,Lt,nt.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,It,nt.width,nt.height,nt.depth,0,_t,Lt,nt.data);else if(S.isData3DTexture)Ut?(re&&e.texStorage3D(r.TEXTURE_3D,ut,It,nt.width,nt.height,nt.depth),I&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,_t,Lt,nt.data)):e.texImage3D(r.TEXTURE_3D,0,It,nt.width,nt.height,nt.depth,0,_t,Lt,nt.data);else if(S.isFramebufferTexture){if(re)if(Ut)e.texStorage2D(r.TEXTURE_2D,ut,It,nt.width,nt.height);else{let Y=nt.width,Z=nt.height;for(let lt=0;lt<ut;lt++)e.texImage2D(r.TEXTURE_2D,lt,It,Y,Z,0,_t,Lt,null),Y>>=1,Z>>=1}}else if(Vt.length>0){if(Ut&&re){const Y=Dt(Vt[0]);e.texStorage2D(r.TEXTURE_2D,ut,It,Y.width,Y.height)}for(let Y=0,Z=Vt.length;Y<Z;Y++)vt=Vt[Y],Ut?I&&e.texSubImage2D(r.TEXTURE_2D,Y,0,0,_t,Lt,vt):e.texImage2D(r.TEXTURE_2D,Y,It,_t,Lt,vt);S.generateMipmaps=!1}else if(Ut){if(re){const Y=Dt(nt);e.texStorage2D(r.TEXTURE_2D,ut,It,Y.width,Y.height)}I&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,_t,Lt,nt)}else e.texImage2D(r.TEXTURE_2D,0,It,_t,Lt,nt);p(S)&&m(j),St.__version=K.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function q(R,S,B){if(S.image.length!==6)return;const j=Bt(R,S),tt=S.source;e.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+B);const K=n.get(tt);if(tt.version!==K.__version||j===!0){e.activeTexture(r.TEXTURE0+B);const St=Kt.getPrimaries(Kt.workingColorSpace),rt=S.colorSpace===kn?null:Kt.getPrimaries(S.colorSpace),mt=S.colorSpace===kn||St===rt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt);const qt=S.isCompressedTexture||S.image[0].isCompressedTexture,nt=S.image[0]&&S.image[0].isDataTexture,_t=[];for(let Z=0;Z<6;Z++)!qt&&!nt?_t[Z]=_(S.image[Z],!0,i.maxCubemapSize):_t[Z]=nt?S.image[Z].image:S.image[Z],_t[Z]=le(S,_t[Z]);const Lt=_t[0],It=s.convert(S.format,S.colorSpace),vt=s.convert(S.type),Vt=y(S.internalFormat,It,vt,S.colorSpace),Ut=S.isVideoTexture!==!0,re=K.__version===void 0||j===!0,I=tt.dataReady;let ut=M(S,Lt);pt(r.TEXTURE_CUBE_MAP,S);let Y;if(qt){Ut&&re&&e.texStorage2D(r.TEXTURE_CUBE_MAP,ut,Vt,Lt.width,Lt.height);for(let Z=0;Z<6;Z++){Y=_t[Z].mipmaps;for(let lt=0;lt<Y.length;lt++){const dt=Y[lt];S.format!==Ke?It!==null?Ut?I&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,lt,0,0,dt.width,dt.height,It,dt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,lt,Vt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ut?I&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,lt,0,0,dt.width,dt.height,It,vt,dt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,lt,Vt,dt.width,dt.height,0,It,vt,dt.data)}}}else{if(Y=S.mipmaps,Ut&&re){Y.length>0&&ut++;const Z=Dt(_t[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,ut,Vt,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(nt){Ut?I&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,_t[Z].width,_t[Z].height,It,vt,_t[Z].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Vt,_t[Z].width,_t[Z].height,0,It,vt,_t[Z].data);for(let lt=0;lt<Y.length;lt++){const Wt=Y[lt].image[Z].image;Ut?I&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,lt+1,0,0,Wt.width,Wt.height,It,vt,Wt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,lt+1,Vt,Wt.width,Wt.height,0,It,vt,Wt.data)}}else{Ut?I&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,It,vt,_t[Z]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Vt,It,vt,_t[Z]);for(let lt=0;lt<Y.length;lt++){const dt=Y[lt];Ut?I&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,lt+1,0,0,It,vt,dt.image[Z]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,lt+1,Vt,It,vt,dt.image[Z])}}}p(S)&&m(r.TEXTURE_CUBE_MAP),K.__version=tt.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function et(R,S,B,j,tt,K){const St=s.convert(B.format,B.colorSpace),rt=s.convert(B.type),mt=y(B.internalFormat,St,rt,B.colorSpace);if(!n.get(S).__hasExternalTextures){const nt=Math.max(1,S.width>>K),_t=Math.max(1,S.height>>K);tt===r.TEXTURE_3D||tt===r.TEXTURE_2D_ARRAY?e.texImage3D(tt,K,mt,nt,_t,S.depth,0,St,rt,null):e.texImage2D(tt,K,mt,nt,_t,0,St,rt,null)}e.bindFramebuffer(r.FRAMEBUFFER,R),Yt(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,j,tt,n.get(B).__webglTexture,0,zt(S)):(tt===r.TEXTURE_2D||tt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,j,tt,n.get(B).__webglTexture,K),e.bindFramebuffer(r.FRAMEBUFFER,null)}function gt(R,S,B){if(r.bindRenderbuffer(r.RENDERBUFFER,R),S.depthBuffer){const j=S.depthTexture,tt=j&&j.isDepthTexture?j.type:null,K=x(S.stencilBuffer,tt),St=S.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,rt=zt(S);Yt(S)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,rt,K,S.width,S.height):B?r.renderbufferStorageMultisample(r.RENDERBUFFER,rt,K,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,K,S.width,S.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,St,r.RENDERBUFFER,R)}else{const j=S.textures;for(let tt=0;tt<j.length;tt++){const K=j[tt],St=s.convert(K.format,K.colorSpace),rt=s.convert(K.type),mt=y(K.internalFormat,St,rt,K.colorSpace),qt=zt(S);B&&Yt(S)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,qt,mt,S.width,S.height):Yt(S)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,qt,mt,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,mt,S.width,S.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ht(R,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),V(S.depthTexture,0);const j=n.get(S.depthTexture).__webglTexture,tt=zt(S);if(S.depthTexture.format===Fi)Yt(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,j,0,tt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,j,0);else if(S.depthTexture.format===Vi)Yt(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,j,0,tt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Rt(R){const S=n.get(R),B=R.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==R.depthTexture){const j=R.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),j){const tt=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,j.removeEventListener("dispose",tt)};j.addEventListener("dispose",tt),S.__depthDisposeCallback=tt}S.__boundDepthTexture=j}if(R.depthTexture&&!S.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");ht(S.__webglFramebuffer,R)}else if(B){S.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[j]),S.__webglDepthbuffer[j]===void 0)S.__webglDepthbuffer[j]=r.createRenderbuffer(),gt(S.__webglDepthbuffer[j],R,!1);else{const tt=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,K=S.__webglDepthbuffer[j];r.bindRenderbuffer(r.RENDERBUFFER,K),r.framebufferRenderbuffer(r.FRAMEBUFFER,tt,r.RENDERBUFFER,K)}}else if(e.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=r.createRenderbuffer(),gt(S.__webglDepthbuffer,R,!1);else{const j=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,tt=S.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,tt),r.framebufferRenderbuffer(r.FRAMEBUFFER,j,r.RENDERBUFFER,tt)}e.bindFramebuffer(r.FRAMEBUFFER,null)}function At(R,S,B){const j=n.get(R);S!==void 0&&et(j.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),B!==void 0&&Rt(R)}function kt(R){const S=R.texture,B=n.get(R),j=n.get(S);R.addEventListener("dispose",T);const tt=R.textures,K=R.isWebGLCubeRenderTarget===!0,St=tt.length>1;if(St||(j.__webglTexture===void 0&&(j.__webglTexture=r.createTexture()),j.__version=S.version,a.memory.textures++),K){B.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer[rt]=[];for(let mt=0;mt<S.mipmaps.length;mt++)B.__webglFramebuffer[rt][mt]=r.createFramebuffer()}else B.__webglFramebuffer[rt]=r.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer=[];for(let rt=0;rt<S.mipmaps.length;rt++)B.__webglFramebuffer[rt]=r.createFramebuffer()}else B.__webglFramebuffer=r.createFramebuffer();if(St)for(let rt=0,mt=tt.length;rt<mt;rt++){const qt=n.get(tt[rt]);qt.__webglTexture===void 0&&(qt.__webglTexture=r.createTexture(),a.memory.textures++)}if(R.samples>0&&Yt(R)===!1){B.__webglMultisampledFramebuffer=r.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let rt=0;rt<tt.length;rt++){const mt=tt[rt];B.__webglColorRenderbuffer[rt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,B.__webglColorRenderbuffer[rt]);const qt=s.convert(mt.format,mt.colorSpace),nt=s.convert(mt.type),_t=y(mt.internalFormat,qt,nt,mt.colorSpace,R.isXRRenderTarget===!0),Lt=zt(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,Lt,_t,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+rt,r.RENDERBUFFER,B.__webglColorRenderbuffer[rt])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(B.__webglDepthRenderbuffer=r.createRenderbuffer(),gt(B.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(K){e.bindTexture(r.TEXTURE_CUBE_MAP,j.__webglTexture),pt(r.TEXTURE_CUBE_MAP,S);for(let rt=0;rt<6;rt++)if(S.mipmaps&&S.mipmaps.length>0)for(let mt=0;mt<S.mipmaps.length;mt++)et(B.__webglFramebuffer[rt][mt],R,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+rt,mt);else et(B.__webglFramebuffer[rt],R,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);p(S)&&m(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(St){for(let rt=0,mt=tt.length;rt<mt;rt++){const qt=tt[rt],nt=n.get(qt);e.bindTexture(r.TEXTURE_2D,nt.__webglTexture),pt(r.TEXTURE_2D,qt),et(B.__webglFramebuffer,R,qt,r.COLOR_ATTACHMENT0+rt,r.TEXTURE_2D,0),p(qt)&&m(r.TEXTURE_2D)}e.unbindTexture()}else{let rt=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(rt=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(rt,j.__webglTexture),pt(rt,S),S.mipmaps&&S.mipmaps.length>0)for(let mt=0;mt<S.mipmaps.length;mt++)et(B.__webglFramebuffer[mt],R,S,r.COLOR_ATTACHMENT0,rt,mt);else et(B.__webglFramebuffer,R,S,r.COLOR_ATTACHMENT0,rt,0);p(S)&&m(rt),e.unbindTexture()}R.depthBuffer&&Rt(R)}function jt(R){const S=R.textures;for(let B=0,j=S.length;B<j;B++){const tt=S[B];if(p(tt)){const K=R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,St=n.get(tt).__webglTexture;e.bindTexture(K,St),m(K),e.unbindTexture()}}}const Ht=[],L=[];function Fe(R){if(R.samples>0){if(Yt(R)===!1){const S=R.textures,B=R.width,j=R.height;let tt=r.COLOR_BUFFER_BIT;const K=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,St=n.get(R),rt=S.length>1;if(rt)for(let mt=0;mt<S.length;mt++)e.bindFramebuffer(r.FRAMEBUFFER,St.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,St.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let mt=0;mt<S.length;mt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(tt|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(tt|=r.STENCIL_BUFFER_BIT)),rt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,St.__webglColorRenderbuffer[mt]);const qt=n.get(S[mt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,qt,0)}r.blitFramebuffer(0,0,B,j,0,0,B,j,tt,r.NEAREST),l===!0&&(Ht.length=0,L.length=0,Ht.push(r.COLOR_ATTACHMENT0+mt),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Ht.push(K),L.push(K),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,L)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ht))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),rt)for(let mt=0;mt<S.length;mt++){e.bindFramebuffer(r.FRAMEBUFFER,St.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.RENDERBUFFER,St.__webglColorRenderbuffer[mt]);const qt=n.get(S[mt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,St.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.TEXTURE_2D,qt,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const S=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[S])}}}function zt(R){return Math.min(i.maxSamples,R.samples)}function Yt(R){const S=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Pt(R){const S=a.render.frame;h.get(R)!==S&&(h.set(R,S),R.update())}function le(R,S){const B=R.colorSpace,j=R.format,tt=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||B!==Ae&&B!==kn&&(Kt.getTransfer(B)===ue?(j!==Ke||tt!==Rn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),S}function Dt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=b,this.setTexture2D=V,this.setTexture2DArray=X,this.setTexture3D=z,this.setTextureCube=J,this.rebindTextures=At,this.setupRenderTarget=kt,this.updateRenderTargetMipmap=jt,this.updateMultisampleRenderTarget=Fe,this.setupDepthRenderbuffer=Rt,this.setupFrameBufferTexture=et,this.useMultisampledRTT=Yt}function Lg(r,t){function e(n,i=kn){let s;const a=Kt.getTransfer(i);if(n===Rn)return r.UNSIGNED_BYTE;if(n===Eo)return r.UNSIGNED_SHORT_4_4_4_4;if(n===wo)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Ic)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Pc)return r.BYTE;if(n===Lc)return r.SHORT;if(n===Ms)return r.UNSIGNED_SHORT;if(n===bo)return r.INT;if(n===li)return r.UNSIGNED_INT;if(n===rn)return r.FLOAT;if(n===Ts)return r.HALF_FLOAT;if(n===Dc)return r.ALPHA;if(n===Nc)return r.RGB;if(n===Ke)return r.RGBA;if(n===Uc)return r.LUMINANCE;if(n===Fc)return r.LUMINANCE_ALPHA;if(n===Fi)return r.DEPTH_COMPONENT;if(n===Vi)return r.DEPTH_STENCIL;if(n===Ao)return r.RED;if(n===To)return r.RED_INTEGER;if(n===Oc)return r.RG;if(n===Ro)return r.RG_INTEGER;if(n===Co)return r.RGBA_INTEGER;if(n===dr||n===fr||n===pr||n===mr)if(a===ue)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===dr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===fr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===pr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===mr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===dr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===fr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===pr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===mr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ka||n===Ga||n===Ha||n===za)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ka)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ga)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ha)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===za)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Va||n===Wa||n===Xa)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Va||n===Wa)return a===ue?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Xa)return a===ue?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ya||n===qa||n===Ka||n===ja||n===$a||n===Ja||n===Za||n===Qa||n===to||n===eo||n===no||n===io||n===so||n===ro)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Ya)return a===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===qa)return a===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ka)return a===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ja)return a===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===$a)return a===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ja)return a===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Za)return a===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Qa)return a===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===to)return a===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===eo)return a===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===no)return a===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===io)return a===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===so)return a===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ro)return a===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===gr||n===ao||n===oo)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===gr)return a===ue?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ao)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===oo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Bc||n===lo||n===co||n===ho)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===gr)return s.COMPRESSED_RED_RGTC1_EXT;if(n===lo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===co)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ho)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===zi?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}class Ig extends Le{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class se extends oe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Dg={type:"move"};class fa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new se,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new se,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new se,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const p=e.getJointPose(_,n),m=this._getHandJoint(c,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Dg)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new se;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Ng=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ug=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Fg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new ye,s=t.properties.get(i);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Yn({vertexShader:Ng,fragmentShader:Ug,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new wt(new Cs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Og extends hi{constructor(t,e){super();const n=this;let i=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const _=new Fg,p=e.getContextAttributes();let m=null,y=null;const x=[],M=[],C=new ft;let T=null;const w=new Le;w.layers.enable(1),w.viewport=new Jt;const P=new Le;P.layers.enable(2),P.viewport=new Jt;const U=[w,P],v=new Ig;v.layers.enable(1),v.layers.enable(2);let b=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let et=x[q];return et===void 0&&(et=new fa,x[q]=et),et.getTargetRaySpace()},this.getControllerGrip=function(q){let et=x[q];return et===void 0&&(et=new fa,x[q]=et),et.getGripSpace()},this.getHand=function(q){let et=x[q];return et===void 0&&(et=new fa,x[q]=et),et.getHandSpace()};function O(q){const et=M.indexOf(q.inputSource);if(et===-1)return;const gt=x[et];gt!==void 0&&(gt.update(q.inputSource,q.frame,c||a),gt.dispatchEvent({type:q.type,data:q.inputSource}))}function V(){i.removeEventListener("select",O),i.removeEventListener("selectstart",O),i.removeEventListener("selectend",O),i.removeEventListener("squeeze",O),i.removeEventListener("squeezestart",O),i.removeEventListener("squeezeend",O),i.removeEventListener("end",V),i.removeEventListener("inputsourceschange",X);for(let q=0;q<x.length;q++){const et=M[q];et!==null&&(M[q]=null,x[q].disconnect(et))}b=null,F=null,_.reset(),t.setRenderTarget(m),f=null,d=null,u=null,i=null,y=null,Xt.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(q){if(i=q,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",O),i.addEventListener("selectstart",O),i.addEventListener("selectend",O),i.addEventListener("squeeze",O),i.addEventListener("squeezestart",O),i.addEventListener("squeezeend",O),i.addEventListener("end",V),i.addEventListener("inputsourceschange",X),p.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(C),i.renderState.layers===void 0){const et={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,et),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new ci(f.framebufferWidth,f.framebufferHeight,{format:Ke,type:Rn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let et=null,gt=null,ht=null;p.depth&&(ht=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=p.stencil?Vi:Fi,gt=p.stencil?zi:li);const Rt={colorFormat:e.RGBA8,depthFormat:ht,scaleFactor:s};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(Rt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),y=new ci(d.textureWidth,d.textureHeight,{format:Ke,type:Rn,depthTexture:new th(d.textureWidth,d.textureHeight,gt,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Xt.setContext(i),Xt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function X(q){for(let et=0;et<q.removed.length;et++){const gt=q.removed[et],ht=M.indexOf(gt);ht>=0&&(M[ht]=null,x[ht].disconnect(gt))}for(let et=0;et<q.added.length;et++){const gt=q.added[et];let ht=M.indexOf(gt);if(ht===-1){for(let At=0;At<x.length;At++)if(At>=M.length){M.push(gt),ht=At;break}else if(M[At]===null){M[At]=gt,ht=At;break}if(ht===-1)break}const Rt=x[ht];Rt&&Rt.connect(gt)}}const z=new A,J=new A;function W(q,et,gt){z.setFromMatrixPosition(et.matrixWorld),J.setFromMatrixPosition(gt.matrixWorld);const ht=z.distanceTo(J),Rt=et.projectionMatrix.elements,At=gt.projectionMatrix.elements,kt=Rt[14]/(Rt[10]-1),jt=Rt[14]/(Rt[10]+1),Ht=(Rt[9]+1)/Rt[5],L=(Rt[9]-1)/Rt[5],Fe=(Rt[8]-1)/Rt[0],zt=(At[8]+1)/At[0],Yt=kt*Fe,Pt=kt*zt,le=ht/(-Fe+zt),Dt=le*-Fe;if(et.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Dt),q.translateZ(le),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Rt[10]===-1)q.projectionMatrix.copy(et.projectionMatrix),q.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const R=kt+le,S=jt+le,B=Yt-Dt,j=Pt+(ht-Dt),tt=Ht*jt/S*R,K=L*jt/S*R;q.projectionMatrix.makePerspective(B,j,tt,K,R,S),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function at(q,et){et===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(et.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(i===null)return;let et=q.near,gt=q.far;_.texture!==null&&(_.depthNear>0&&(et=_.depthNear),_.depthFar>0&&(gt=_.depthFar)),v.near=P.near=w.near=et,v.far=P.far=w.far=gt,(b!==v.near||F!==v.far)&&(i.updateRenderState({depthNear:v.near,depthFar:v.far}),b=v.near,F=v.far);const ht=q.parent,Rt=v.cameras;at(v,ht);for(let At=0;At<Rt.length;At++)at(Rt[At],ht);Rt.length===2?W(v,w,P):v.projectionMatrix.copy(w.projectionMatrix),ot(q,v,ht)};function ot(q,et,gt){gt===null?q.matrix.copy(et.matrixWorld):(q.matrix.copy(gt.matrixWorld),q.matrix.invert(),q.matrix.multiply(et.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(et.projectionMatrix),q.projectionMatrixInverse.copy(et.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Wi*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(v)};let pt=null;function Bt(q,et){if(h=et.getViewerPose(c||a),g=et,h!==null){const gt=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let ht=!1;gt.length!==v.cameras.length&&(v.cameras.length=0,ht=!0);for(let At=0;At<gt.length;At++){const kt=gt[At];let jt=null;if(f!==null)jt=f.getViewport(kt);else{const L=u.getViewSubImage(d,kt);jt=L.viewport,At===0&&(t.setRenderTargetTextures(y,L.colorTexture,d.ignoreDepthValues?void 0:L.depthStencilTexture),t.setRenderTarget(y))}let Ht=U[At];Ht===void 0&&(Ht=new Le,Ht.layers.enable(At),Ht.viewport=new Jt,U[At]=Ht),Ht.matrix.fromArray(kt.transform.matrix),Ht.matrix.decompose(Ht.position,Ht.quaternion,Ht.scale),Ht.projectionMatrix.fromArray(kt.projectionMatrix),Ht.projectionMatrixInverse.copy(Ht.projectionMatrix).invert(),Ht.viewport.set(jt.x,jt.y,jt.width,jt.height),At===0&&(v.matrix.copy(Ht.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),ht===!0&&v.cameras.push(Ht)}const Rt=i.enabledFeatures;if(Rt&&Rt.includes("depth-sensing")){const At=u.getDepthInformation(gt[0]);At&&At.isValid&&At.texture&&_.init(t,At,i.renderState)}}for(let gt=0;gt<x.length;gt++){const ht=M[gt],Rt=x[gt];ht!==null&&Rt!==void 0&&Rt.update(ht,et,c||a)}pt&&pt(q,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),g=null}const Xt=new Qc;Xt.setAnimationLoop(Bt),this.setAnimationLoop=function(q){pt=q},this.dispose=function(){}}}const ti=new dn,Bg=new Nt;function kg(r,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,$c(r)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,y,x,M){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),u(p,m)):m.isMeshPhongMaterial?(s(p,m),h(p,m)):m.isMeshStandardMaterial?(s(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,M)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),_(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,y,x):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Ue&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Ue&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const y=t.get(m),x=y.envMap,M=y.envMapRotation;x&&(p.envMap.value=x,ti.copy(M),ti.x*=-1,ti.y*=-1,ti.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ti.y*=-1,ti.z*=-1),p.envMapRotation.value.setFromMatrix4(Bg.makeRotationFromEuler(ti)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,y,x){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*y,p.scale.value=x*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,y){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ue&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const y=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Gg(r,t,e,n){let i={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,x){const M=x.program;n.uniformBlockBinding(y,M)}function c(y,x){let M=i[y.id];M===void 0&&(g(y),M=h(y),i[y.id]=M,y.addEventListener("dispose",p));const C=x.program;n.updateUBOMapping(y,C);const T=t.render.frame;s[y.id]!==T&&(d(y),s[y.id]=T)}function h(y){const x=u();y.__bindingPointIndex=x;const M=r.createBuffer(),C=y.__size,T=y.usage;return r.bindBuffer(r.UNIFORM_BUFFER,M),r.bufferData(r.UNIFORM_BUFFER,C,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,M),M}function u(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const x=i[y.id],M=y.uniforms,C=y.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let T=0,w=M.length;T<w;T++){const P=Array.isArray(M[T])?M[T]:[M[T]];for(let U=0,v=P.length;U<v;U++){const b=P[U];if(f(b,T,U,C)===!0){const F=b.__offset,O=Array.isArray(b.value)?b.value:[b.value];let V=0;for(let X=0;X<O.length;X++){const z=O[X],J=_(z);typeof z=="number"||typeof z=="boolean"?(b.__data[0]=z,r.bufferSubData(r.UNIFORM_BUFFER,F+V,b.__data)):z.isMatrix3?(b.__data[0]=z.elements[0],b.__data[1]=z.elements[1],b.__data[2]=z.elements[2],b.__data[3]=0,b.__data[4]=z.elements[3],b.__data[5]=z.elements[4],b.__data[6]=z.elements[5],b.__data[7]=0,b.__data[8]=z.elements[6],b.__data[9]=z.elements[7],b.__data[10]=z.elements[8],b.__data[11]=0):(z.toArray(b.__data,V),V+=J.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,F,b.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(y,x,M,C){const T=y.value,w=x+"_"+M;if(C[w]===void 0)return typeof T=="number"||typeof T=="boolean"?C[w]=T:C[w]=T.clone(),!0;{const P=C[w];if(typeof T=="number"||typeof T=="boolean"){if(P!==T)return C[w]=T,!0}else if(P.equals(T)===!1)return P.copy(T),!0}return!1}function g(y){const x=y.uniforms;let M=0;const C=16;for(let w=0,P=x.length;w<P;w++){const U=Array.isArray(x[w])?x[w]:[x[w]];for(let v=0,b=U.length;v<b;v++){const F=U[v],O=Array.isArray(F.value)?F.value:[F.value];for(let V=0,X=O.length;V<X;V++){const z=O[V],J=_(z),W=M%C,at=W%J.boundary,ot=W+at;M+=at,ot!==0&&C-ot<J.storage&&(M+=C-ot),F.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=M,M+=J.storage}}}const T=M%C;return T>0&&(M+=C-T),y.__size=M,y.__cache={},this}function _(y){const x={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(x.boundary=4,x.storage=4):y.isVector2?(x.boundary=8,x.storage=8):y.isVector3||y.isColor?(x.boundary=16,x.storage=12):y.isVector4?(x.boundary=16,x.storage=16):y.isMatrix3?(x.boundary=48,x.storage=48):y.isMatrix4?(x.boundary=64,x.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),x}function p(y){const x=y.target;x.removeEventListener("dispose",p);const M=a.indexOf(x.__bindingPointIndex);a.splice(M,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function m(){for(const y in i)r.deleteBuffer(i[y]);a=[],i={},s={}}return{bind:l,update:c,dispose:m}}class Hg{constructor(t={}){const{canvas:e=Tu(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const m=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=fe,this.toneMapping=Wn,this.toneMappingExposure=1;const x=this;let M=!1,C=0,T=0,w=null,P=-1,U=null;const v=new Jt,b=new Jt;let F=null;const O=new yt(0);let V=0,X=e.width,z=e.height,J=1,W=null,at=null;const ot=new Jt(0,0,X,z),pt=new Jt(0,0,X,z);let Bt=!1;const Xt=new No;let q=!1,et=!1;const gt=new Nt,ht=new Nt,Rt=new A,At=new Jt,kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let jt=!1;function Ht(){return w===null?J:1}let L=n;function Fe(E,D){return e.getContext(E,D)}try{const E={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${So}`),e.addEventListener("webglcontextlost",Z,!1),e.addEventListener("webglcontextrestored",lt,!1),e.addEventListener("webglcontextcreationerror",dt,!1),L===null){const D="webgl2";if(L=Fe(D,E),L===null)throw Fe(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let zt,Yt,Pt,le,Dt,R,S,B,j,tt,K,St,rt,mt,qt,nt,_t,Lt,It,vt,Vt,Ut,re,I;function ut(){zt=new Yp(L),zt.init(),Ut=new Lg(L,zt),Yt=new Gp(L,zt,t,Ut),Pt=new Rg(L),Yt.reverseDepthBuffer&&Pt.buffers.depth.setReversed(!0),le=new jp(L),Dt=new fg,R=new Pg(L,zt,Pt,Dt,Yt,Ut,le),S=new zp(x),B=new Xp(x),j=new ed(L),re=new Bp(L,j),tt=new qp(L,j,le,re),K=new Jp(L,tt,j,le),It=new $p(L,Yt,R),nt=new Hp(Dt),St=new dg(x,S,B,zt,Yt,re,nt),rt=new kg(x,Dt),mt=new mg,qt=new Mg(zt),Lt=new Op(x,S,B,Pt,K,d,l),_t=new Ag(x,K,Yt),I=new Gg(L,le,Yt,Pt),vt=new kp(L,zt,le),Vt=new Kp(L,zt,le),le.programs=St.programs,x.capabilities=Yt,x.extensions=zt,x.properties=Dt,x.renderLists=mt,x.shadowMap=_t,x.state=Pt,x.info=le}ut();const Y=new Og(x,L);this.xr=Y,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const E=zt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=zt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(E){E!==void 0&&(J=E,this.setSize(X,z,!1))},this.getSize=function(E){return E.set(X,z)},this.setSize=function(E,D,G=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=E,z=D,e.width=Math.floor(E*J),e.height=Math.floor(D*J),G===!0&&(e.style.width=E+"px",e.style.height=D+"px"),this.setViewport(0,0,E,D)},this.getDrawingBufferSize=function(E){return E.set(X*J,z*J).floor()},this.setDrawingBufferSize=function(E,D,G){X=E,z=D,J=G,e.width=Math.floor(E*G),e.height=Math.floor(D*G),this.setViewport(0,0,E,D)},this.getCurrentViewport=function(E){return E.copy(v)},this.getViewport=function(E){return E.copy(ot)},this.setViewport=function(E,D,G,H){E.isVector4?ot.set(E.x,E.y,E.z,E.w):ot.set(E,D,G,H),Pt.viewport(v.copy(ot).multiplyScalar(J).round())},this.getScissor=function(E){return E.copy(pt)},this.setScissor=function(E,D,G,H){E.isVector4?pt.set(E.x,E.y,E.z,E.w):pt.set(E,D,G,H),Pt.scissor(b.copy(pt).multiplyScalar(J).round())},this.getScissorTest=function(){return Bt},this.setScissorTest=function(E){Pt.setScissorTest(Bt=E)},this.setOpaqueSort=function(E){W=E},this.setTransparentSort=function(E){at=E},this.getClearColor=function(E){return E.copy(Lt.getClearColor())},this.setClearColor=function(){Lt.setClearColor.apply(Lt,arguments)},this.getClearAlpha=function(){return Lt.getClearAlpha()},this.setClearAlpha=function(){Lt.setClearAlpha.apply(Lt,arguments)},this.clear=function(E=!0,D=!0,G=!0){let H=0;if(E){let N=!1;if(w!==null){const it=w.texture.format;N=it===Co||it===Ro||it===To}if(N){const it=w.texture.type,ct=it===Rn||it===li||it===Ms||it===zi||it===Eo||it===wo,xt=Lt.getClearColor(),Mt=Lt.getClearAlpha(),Tt=xt.r,Ct=xt.g,bt=xt.b;ct?(f[0]=Tt,f[1]=Ct,f[2]=bt,f[3]=Mt,L.clearBufferuiv(L.COLOR,0,f)):(g[0]=Tt,g[1]=Ct,g[2]=bt,g[3]=Mt,L.clearBufferiv(L.COLOR,0,g))}else H|=L.COLOR_BUFFER_BIT}D&&(H|=L.DEPTH_BUFFER_BIT,L.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),G&&(H|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Z,!1),e.removeEventListener("webglcontextrestored",lt,!1),e.removeEventListener("webglcontextcreationerror",dt,!1),mt.dispose(),qt.dispose(),Dt.dispose(),S.dispose(),B.dispose(),K.dispose(),re.dispose(),I.dispose(),St.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",Xo),Y.removeEventListener("sessionend",Yo),Kn.stop()};function Z(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function lt(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const E=le.autoReset,D=_t.enabled,G=_t.autoUpdate,H=_t.needsUpdate,N=_t.type;ut(),le.autoReset=E,_t.enabled=D,_t.autoUpdate=G,_t.needsUpdate=H,_t.type=N}function dt(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Wt(E){const D=E.target;D.removeEventListener("dispose",Wt),_e(D)}function _e(E){De(E),Dt.remove(E)}function De(E){const D=Dt.get(E).programs;D!==void 0&&(D.forEach(function(G){St.releaseProgram(G)}),E.isShaderMaterial&&St.releaseShaderCache(E))}this.renderBufferDirect=function(E,D,G,H,N,it){D===null&&(D=kt);const ct=N.isMesh&&N.matrixWorld.determinant()<0,xt=xh(E,D,G,H,N);Pt.setMaterial(H,ct);let Mt=G.index,Tt=1;if(H.wireframe===!0){if(Mt=tt.getWireframeAttribute(G),Mt===void 0)return;Tt=2}const Ct=G.drawRange,bt=G.attributes.position;let ne=Ct.start*Tt,ce=(Ct.start+Ct.count)*Tt;it!==null&&(ne=Math.max(ne,it.start*Tt),ce=Math.min(ce,(it.start+it.count)*Tt)),Mt!==null?(ne=Math.max(ne,0),ce=Math.min(ce,Mt.count)):bt!=null&&(ne=Math.max(ne,0),ce=Math.min(ce,bt.count));const pe=ce-ne;if(pe<0||pe===1/0)return;re.setup(N,H,xt,G,Mt);let Oe,Zt=vt;if(Mt!==null&&(Oe=j.get(Mt),Zt=Vt,Zt.setIndex(Oe)),N.isMesh)H.wireframe===!0?(Pt.setLineWidth(H.wireframeLinewidth*Ht()),Zt.setMode(L.LINES)):Zt.setMode(L.TRIANGLES);else if(N.isLine){let Et=H.linewidth;Et===void 0&&(Et=1),Pt.setLineWidth(Et*Ht()),N.isLineSegments?Zt.setMode(L.LINES):N.isLineLoop?Zt.setMode(L.LINE_LOOP):Zt.setMode(L.LINE_STRIP)}else N.isPoints?Zt.setMode(L.POINTS):N.isSprite&&Zt.setMode(L.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Zt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(zt.get("WEBGL_multi_draw"))Zt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Et=N._multiDrawStarts,we=N._multiDrawCounts,Qt=N._multiDrawCount,$e=Mt?j.get(Mt).bytesPerElement:1,ui=Dt.get(H).currentProgram.getUniforms();for(let Be=0;Be<Qt;Be++)ui.setValue(L,"_gl_DrawID",Be),Zt.render(Et[Be]/$e,we[Be])}else if(N.isInstancedMesh)Zt.renderInstances(ne,pe,N.count);else if(G.isInstancedBufferGeometry){const Et=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,we=Math.min(G.instanceCount,Et);Zt.renderInstances(ne,pe,we)}else Zt.render(ne,pe)};function $t(E,D,G){E.transparent===!0&&E.side===xe&&E.forceSinglePass===!1?(E.side=Ue,E.needsUpdate=!0,Ds(E,D,G),E.side=Tn,E.needsUpdate=!0,Ds(E,D,G),E.side=xe):Ds(E,D,G)}this.compile=function(E,D,G=null){G===null&&(G=E),p=qt.get(G),p.init(D),y.push(p),G.traverseVisible(function(N){N.isLight&&N.layers.test(D.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),E!==G&&E.traverseVisible(function(N){N.isLight&&N.layers.test(D.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const H=new Set;return E.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const it=N.material;if(it)if(Array.isArray(it))for(let ct=0;ct<it.length;ct++){const xt=it[ct];$t(xt,G,N),H.add(xt)}else $t(it,G,N),H.add(it)}),y.pop(),p=null,H},this.compileAsync=function(E,D,G=null){const H=this.compile(E,D,G);return new Promise(N=>{function it(){if(H.forEach(function(ct){Dt.get(ct).currentProgram.isReady()&&H.delete(ct)}),H.size===0){N(E);return}setTimeout(it,10)}zt.get("KHR_parallel_shader_compile")!==null?it():setTimeout(it,10)})};let Ne=null;function gn(E){Ne&&Ne(E)}function Xo(){Kn.stop()}function Yo(){Kn.start()}const Kn=new Qc;Kn.setAnimationLoop(gn),typeof self<"u"&&Kn.setContext(self),this.setAnimationLoop=function(E){Ne=E,Y.setAnimationLoop(E),E===null?Kn.stop():Kn.start()},Y.addEventListener("sessionstart",Xo),Y.addEventListener("sessionend",Yo),this.render=function(E,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(D),D=Y.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,D,w),p=qt.get(E,y.length),p.init(D),y.push(p),ht.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Xt.setFromProjectionMatrix(ht),et=this.localClippingEnabled,q=nt.init(this.clippingPlanes,et),_=mt.get(E,m.length),_.init(),m.push(_),Y.enabled===!0&&Y.isPresenting===!0){const it=x.xr.getDepthSensingMesh();it!==null&&Ur(it,D,-1/0,x.sortObjects)}Ur(E,D,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(W,at),jt=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,jt&&Lt.addToRenderList(_,E),this.info.render.frame++,q===!0&&nt.beginShadows();const G=p.state.shadowsArray;_t.render(G,E,D),q===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=_.opaque,N=_.transmissive;if(p.setupLights(),D.isArrayCamera){const it=D.cameras;if(N.length>0)for(let ct=0,xt=it.length;ct<xt;ct++){const Mt=it[ct];Ko(H,N,E,Mt)}jt&&Lt.render(E);for(let ct=0,xt=it.length;ct<xt;ct++){const Mt=it[ct];qo(_,E,Mt,Mt.viewport)}}else N.length>0&&Ko(H,N,E,D),jt&&Lt.render(E),qo(_,E,D);w!==null&&(R.updateMultisampleRenderTarget(w),R.updateRenderTargetMipmap(w)),E.isScene===!0&&E.onAfterRender(x,E,D),re.resetDefaultState(),P=-1,U=null,y.pop(),y.length>0?(p=y[y.length-1],q===!0&&nt.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function Ur(E,D,G,H){if(E.visible===!1)return;if(E.layers.test(D.layers)){if(E.isGroup)G=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(D);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Xt.intersectsSprite(E)){H&&At.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ht);const ct=K.update(E),xt=E.material;xt.visible&&_.push(E,ct,xt,G,At.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Xt.intersectsObject(E))){const ct=K.update(E),xt=E.material;if(H&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),At.copy(E.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),At.copy(ct.boundingSphere.center)),At.applyMatrix4(E.matrixWorld).applyMatrix4(ht)),Array.isArray(xt)){const Mt=ct.groups;for(let Tt=0,Ct=Mt.length;Tt<Ct;Tt++){const bt=Mt[Tt],ne=xt[bt.materialIndex];ne&&ne.visible&&_.push(E,ct,ne,G,At.z,bt)}}else xt.visible&&_.push(E,ct,xt,G,At.z,null)}}const it=E.children;for(let ct=0,xt=it.length;ct<xt;ct++)Ur(it[ct],D,G,H)}function qo(E,D,G,H){const N=E.opaque,it=E.transmissive,ct=E.transparent;p.setupLightsView(G),q===!0&&nt.setGlobalState(x.clippingPlanes,G),H&&Pt.viewport(v.copy(H)),N.length>0&&Is(N,D,G),it.length>0&&Is(it,D,G),ct.length>0&&Is(ct,D,G),Pt.buffers.depth.setTest(!0),Pt.buffers.depth.setMask(!0),Pt.buffers.color.setMask(!0),Pt.setPolygonOffset(!1)}function Ko(E,D,G,H){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new ci(1,1,{generateMipmaps:!0,type:zt.has("EXT_color_buffer_half_float")||zt.has("EXT_color_buffer_float")?Ts:Rn,minFilter:wn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace}));const it=p.state.transmissionRenderTarget[H.id],ct=H.viewport||v;it.setSize(ct.z,ct.w);const xt=x.getRenderTarget();x.setRenderTarget(it),x.getClearColor(O),V=x.getClearAlpha(),V<1&&x.setClearColor(16777215,.5),x.clear(),jt&&Lt.render(G);const Mt=x.toneMapping;x.toneMapping=Wn;const Tt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),q===!0&&nt.setGlobalState(x.clippingPlanes,H),Is(E,G,H),R.updateMultisampleRenderTarget(it),R.updateRenderTargetMipmap(it),zt.has("WEBGL_multisampled_render_to_texture")===!1){let Ct=!1;for(let bt=0,ne=D.length;bt<ne;bt++){const ce=D[bt],pe=ce.object,Oe=ce.geometry,Zt=ce.material,Et=ce.group;if(Zt.side===xe&&pe.layers.test(H.layers)){const we=Zt.side;Zt.side=Ue,Zt.needsUpdate=!0,jo(pe,G,H,Oe,Zt,Et),Zt.side=we,Zt.needsUpdate=!0,Ct=!0}}Ct===!0&&(R.updateMultisampleRenderTarget(it),R.updateRenderTargetMipmap(it))}x.setRenderTarget(xt),x.setClearColor(O,V),Tt!==void 0&&(H.viewport=Tt),x.toneMapping=Mt}function Is(E,D,G){const H=D.isScene===!0?D.overrideMaterial:null;for(let N=0,it=E.length;N<it;N++){const ct=E[N],xt=ct.object,Mt=ct.geometry,Tt=H===null?ct.material:H,Ct=ct.group;xt.layers.test(G.layers)&&jo(xt,D,G,Mt,Tt,Ct)}}function jo(E,D,G,H,N,it){E.onBeforeRender(x,D,G,H,N,it),E.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),N.onBeforeRender(x,D,G,H,E,it),N.transparent===!0&&N.side===xe&&N.forceSinglePass===!1?(N.side=Ue,N.needsUpdate=!0,x.renderBufferDirect(G,D,H,N,E,it),N.side=Tn,N.needsUpdate=!0,x.renderBufferDirect(G,D,H,N,E,it),N.side=xe):x.renderBufferDirect(G,D,H,N,E,it),E.onAfterRender(x,D,G,H,N,it)}function Ds(E,D,G){D.isScene!==!0&&(D=kt);const H=Dt.get(E),N=p.state.lights,it=p.state.shadowsArray,ct=N.state.version,xt=St.getParameters(E,N.state,it,D,G),Mt=St.getProgramCacheKey(xt);let Tt=H.programs;H.environment=E.isMeshStandardMaterial?D.environment:null,H.fog=D.fog,H.envMap=(E.isMeshStandardMaterial?B:S).get(E.envMap||H.environment),H.envMapRotation=H.environment!==null&&E.envMap===null?D.environmentRotation:E.envMapRotation,Tt===void 0&&(E.addEventListener("dispose",Wt),Tt=new Map,H.programs=Tt);let Ct=Tt.get(Mt);if(Ct!==void 0){if(H.currentProgram===Ct&&H.lightsStateVersion===ct)return Jo(E,xt),Ct}else xt.uniforms=St.getUniforms(E),E.onBeforeCompile(xt,x),Ct=St.acquireProgram(xt,Mt),Tt.set(Mt,Ct),H.uniforms=xt.uniforms;const bt=H.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(bt.clippingPlanes=nt.uniform),Jo(E,xt),H.needsLights=Mh(E),H.lightsStateVersion=ct,H.needsLights&&(bt.ambientLightColor.value=N.state.ambient,bt.lightProbe.value=N.state.probe,bt.directionalLights.value=N.state.directional,bt.directionalLightShadows.value=N.state.directionalShadow,bt.spotLights.value=N.state.spot,bt.spotLightShadows.value=N.state.spotShadow,bt.rectAreaLights.value=N.state.rectArea,bt.ltc_1.value=N.state.rectAreaLTC1,bt.ltc_2.value=N.state.rectAreaLTC2,bt.pointLights.value=N.state.point,bt.pointLightShadows.value=N.state.pointShadow,bt.hemisphereLights.value=N.state.hemi,bt.directionalShadowMap.value=N.state.directionalShadowMap,bt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,bt.spotShadowMap.value=N.state.spotShadowMap,bt.spotLightMatrix.value=N.state.spotLightMatrix,bt.spotLightMap.value=N.state.spotLightMap,bt.pointShadowMap.value=N.state.pointShadowMap,bt.pointShadowMatrix.value=N.state.pointShadowMatrix),H.currentProgram=Ct,H.uniformsList=null,Ct}function $o(E){if(E.uniformsList===null){const D=E.currentProgram.getUniforms();E.uniformsList=vr.seqWithValue(D.seq,E.uniforms)}return E.uniformsList}function Jo(E,D){const G=Dt.get(E);G.outputColorSpace=D.outputColorSpace,G.batching=D.batching,G.batchingColor=D.batchingColor,G.instancing=D.instancing,G.instancingColor=D.instancingColor,G.instancingMorph=D.instancingMorph,G.skinning=D.skinning,G.morphTargets=D.morphTargets,G.morphNormals=D.morphNormals,G.morphColors=D.morphColors,G.morphTargetsCount=D.morphTargetsCount,G.numClippingPlanes=D.numClippingPlanes,G.numIntersection=D.numClipIntersection,G.vertexAlphas=D.vertexAlphas,G.vertexTangents=D.vertexTangents,G.toneMapping=D.toneMapping}function xh(E,D,G,H,N){D.isScene!==!0&&(D=kt),R.resetTextureUnits();const it=D.fog,ct=H.isMeshStandardMaterial?D.environment:null,xt=w===null?x.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Ae,Mt=(H.isMeshStandardMaterial?B:S).get(H.envMap||ct),Tt=H.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Ct=!!G.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),bt=!!G.morphAttributes.position,ne=!!G.morphAttributes.normal,ce=!!G.morphAttributes.color;let pe=Wn;H.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(pe=x.toneMapping);const Oe=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Zt=Oe!==void 0?Oe.length:0,Et=Dt.get(H),we=p.state.lights;if(q===!0&&(et===!0||E!==U)){const Ve=E===U&&H.id===P;nt.setState(H,E,Ve)}let Qt=!1;H.version===Et.__version?(Et.needsLights&&Et.lightsStateVersion!==we.state.version||Et.outputColorSpace!==xt||N.isBatchedMesh&&Et.batching===!1||!N.isBatchedMesh&&Et.batching===!0||N.isBatchedMesh&&Et.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Et.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Et.instancing===!1||!N.isInstancedMesh&&Et.instancing===!0||N.isSkinnedMesh&&Et.skinning===!1||!N.isSkinnedMesh&&Et.skinning===!0||N.isInstancedMesh&&Et.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Et.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Et.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Et.instancingMorph===!1&&N.morphTexture!==null||Et.envMap!==Mt||H.fog===!0&&Et.fog!==it||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==nt.numPlanes||Et.numIntersection!==nt.numIntersection)||Et.vertexAlphas!==Tt||Et.vertexTangents!==Ct||Et.morphTargets!==bt||Et.morphNormals!==ne||Et.morphColors!==ce||Et.toneMapping!==pe||Et.morphTargetsCount!==Zt)&&(Qt=!0):(Qt=!0,Et.__version=H.version);let $e=Et.currentProgram;Qt===!0&&($e=Ds(H,D,N));let ui=!1,Be=!1,Fr=!1;const me=$e.getUniforms(),Pn=Et.uniforms;if(Pt.useProgram($e.program)&&(ui=!0,Be=!0,Fr=!0),H.id!==P&&(P=H.id,Be=!0),ui||U!==E){Yt.reverseDepthBuffer?(gt.copy(E.projectionMatrix),Cu(gt),Pu(gt),me.setValue(L,"projectionMatrix",gt)):me.setValue(L,"projectionMatrix",E.projectionMatrix),me.setValue(L,"viewMatrix",E.matrixWorldInverse);const Ve=me.map.cameraPosition;Ve!==void 0&&Ve.setValue(L,Rt.setFromMatrixPosition(E.matrixWorld)),Yt.logarithmicDepthBuffer&&me.setValue(L,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&me.setValue(L,"isOrthographic",E.isOrthographicCamera===!0),U!==E&&(U=E,Be=!0,Fr=!0)}if(N.isSkinnedMesh){me.setOptional(L,N,"bindMatrix"),me.setOptional(L,N,"bindMatrixInverse");const Ve=N.skeleton;Ve&&(Ve.boneTexture===null&&Ve.computeBoneTexture(),me.setValue(L,"boneTexture",Ve.boneTexture,R))}N.isBatchedMesh&&(me.setOptional(L,N,"batchingTexture"),me.setValue(L,"batchingTexture",N._matricesTexture,R),me.setOptional(L,N,"batchingIdTexture"),me.setValue(L,"batchingIdTexture",N._indirectTexture,R),me.setOptional(L,N,"batchingColorTexture"),N._colorsTexture!==null&&me.setValue(L,"batchingColorTexture",N._colorsTexture,R));const Or=G.morphAttributes;if((Or.position!==void 0||Or.normal!==void 0||Or.color!==void 0)&&It.update(N,G,$e),(Be||Et.receiveShadow!==N.receiveShadow)&&(Et.receiveShadow=N.receiveShadow,me.setValue(L,"receiveShadow",N.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Pn.envMap.value=Mt,Pn.flipEnvMap.value=Mt.isCubeTexture&&Mt.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&D.environment!==null&&(Pn.envMapIntensity.value=D.environmentIntensity),Be&&(me.setValue(L,"toneMappingExposure",x.toneMappingExposure),Et.needsLights&&yh(Pn,Fr),it&&H.fog===!0&&rt.refreshFogUniforms(Pn,it),rt.refreshMaterialUniforms(Pn,H,J,z,p.state.transmissionRenderTarget[E.id]),vr.upload(L,$o(Et),Pn,R)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(vr.upload(L,$o(Et),Pn,R),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&me.setValue(L,"center",N.center),me.setValue(L,"modelViewMatrix",N.modelViewMatrix),me.setValue(L,"normalMatrix",N.normalMatrix),me.setValue(L,"modelMatrix",N.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Ve=H.uniformsGroups;for(let Br=0,Sh=Ve.length;Br<Sh;Br++){const Zo=Ve[Br];I.update(Zo,$e),I.bind(Zo,$e)}}return $e}function yh(E,D){E.ambientLightColor.needsUpdate=D,E.lightProbe.needsUpdate=D,E.directionalLights.needsUpdate=D,E.directionalLightShadows.needsUpdate=D,E.pointLights.needsUpdate=D,E.pointLightShadows.needsUpdate=D,E.spotLights.needsUpdate=D,E.spotLightShadows.needsUpdate=D,E.rectAreaLights.needsUpdate=D,E.hemisphereLights.needsUpdate=D}function Mh(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(E,D,G){Dt.get(E.texture).__webglTexture=D,Dt.get(E.depthTexture).__webglTexture=G;const H=Dt.get(E);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=G===void 0,H.__autoAllocateDepthBuffer||zt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,D){const G=Dt.get(E);G.__webglFramebuffer=D,G.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(E,D=0,G=0){w=E,C=D,T=G;let H=!0,N=null,it=!1,ct=!1;if(E){const Mt=Dt.get(E);if(Mt.__useDefaultFramebuffer!==void 0)Pt.bindFramebuffer(L.FRAMEBUFFER,null),H=!1;else if(Mt.__webglFramebuffer===void 0)R.setupRenderTarget(E);else if(Mt.__hasExternalTextures)R.rebindTextures(E,Dt.get(E.texture).__webglTexture,Dt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const bt=E.depthTexture;if(Mt.__boundDepthTexture!==bt){if(bt!==null&&Dt.has(bt)&&(E.width!==bt.image.width||E.height!==bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(E)}}const Tt=E.texture;(Tt.isData3DTexture||Tt.isDataArrayTexture||Tt.isCompressedArrayTexture)&&(ct=!0);const Ct=Dt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ct[D])?N=Ct[D][G]:N=Ct[D],it=!0):E.samples>0&&R.useMultisampledRTT(E)===!1?N=Dt.get(E).__webglMultisampledFramebuffer:Array.isArray(Ct)?N=Ct[G]:N=Ct,v.copy(E.viewport),b.copy(E.scissor),F=E.scissorTest}else v.copy(ot).multiplyScalar(J).floor(),b.copy(pt).multiplyScalar(J).floor(),F=Bt;if(Pt.bindFramebuffer(L.FRAMEBUFFER,N)&&H&&Pt.drawBuffers(E,N),Pt.viewport(v),Pt.scissor(b),Pt.setScissorTest(F),it){const Mt=Dt.get(E.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+D,Mt.__webglTexture,G)}else if(ct){const Mt=Dt.get(E.texture),Tt=D||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Mt.__webglTexture,G||0,Tt)}P=-1},this.readRenderTargetPixels=function(E,D,G,H,N,it,ct){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xt=Dt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ct!==void 0&&(xt=xt[ct]),xt){Pt.bindFramebuffer(L.FRAMEBUFFER,xt);try{const Mt=E.texture,Tt=Mt.format,Ct=Mt.type;if(!Yt.textureFormatReadable(Tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Yt.textureTypeReadable(Ct)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=E.width-H&&G>=0&&G<=E.height-N&&L.readPixels(D,G,H,N,Ut.convert(Tt),Ut.convert(Ct),it)}finally{const Mt=w!==null?Dt.get(w).__webglFramebuffer:null;Pt.bindFramebuffer(L.FRAMEBUFFER,Mt)}}},this.readRenderTargetPixelsAsync=async function(E,D,G,H,N,it,ct){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xt=Dt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ct!==void 0&&(xt=xt[ct]),xt){const Mt=E.texture,Tt=Mt.format,Ct=Mt.type;if(!Yt.textureFormatReadable(Tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Yt.textureTypeReadable(Ct))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=E.width-H&&G>=0&&G<=E.height-N){Pt.bindFramebuffer(L.FRAMEBUFFER,xt);const bt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,bt),L.bufferData(L.PIXEL_PACK_BUFFER,it.byteLength,L.STREAM_READ),L.readPixels(D,G,H,N,Ut.convert(Tt),Ut.convert(Ct),0);const ne=w!==null?Dt.get(w).__webglFramebuffer:null;Pt.bindFramebuffer(L.FRAMEBUFFER,ne);const ce=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Ru(L,ce,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,bt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,it),L.deleteBuffer(bt),L.deleteSync(ce),it}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,D=null,G=0){E.isTexture!==!0&&(_r("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,E=arguments[1]);const H=Math.pow(2,-G),N=Math.floor(E.image.width*H),it=Math.floor(E.image.height*H),ct=D!==null?D.x:0,xt=D!==null?D.y:0;R.setTexture2D(E,0),L.copyTexSubImage2D(L.TEXTURE_2D,G,0,0,ct,xt,N,it),Pt.unbindTexture()},this.copyTextureToTexture=function(E,D,G=null,H=null,N=0){E.isTexture!==!0&&(_r("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,E=arguments[1],D=arguments[2],N=arguments[3]||0,G=null);let it,ct,xt,Mt,Tt,Ct;G!==null?(it=G.max.x-G.min.x,ct=G.max.y-G.min.y,xt=G.min.x,Mt=G.min.y):(it=E.image.width,ct=E.image.height,xt=0,Mt=0),H!==null?(Tt=H.x,Ct=H.y):(Tt=0,Ct=0);const bt=Ut.convert(D.format),ne=Ut.convert(D.type);R.setTexture2D(D,0),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,D.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,D.unpackAlignment);const ce=L.getParameter(L.UNPACK_ROW_LENGTH),pe=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Oe=L.getParameter(L.UNPACK_SKIP_PIXELS),Zt=L.getParameter(L.UNPACK_SKIP_ROWS),Et=L.getParameter(L.UNPACK_SKIP_IMAGES),we=E.isCompressedTexture?E.mipmaps[N]:E.image;L.pixelStorei(L.UNPACK_ROW_LENGTH,we.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,we.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,xt),L.pixelStorei(L.UNPACK_SKIP_ROWS,Mt),E.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,N,Tt,Ct,it,ct,bt,ne,we.data):E.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,N,Tt,Ct,we.width,we.height,bt,we.data):L.texSubImage2D(L.TEXTURE_2D,N,Tt,Ct,it,ct,bt,ne,we),L.pixelStorei(L.UNPACK_ROW_LENGTH,ce),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,pe),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Oe),L.pixelStorei(L.UNPACK_SKIP_ROWS,Zt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Et),N===0&&D.generateMipmaps&&L.generateMipmap(L.TEXTURE_2D),Pt.unbindTexture()},this.copyTextureToTexture3D=function(E,D,G=null,H=null,N=0){E.isTexture!==!0&&(_r("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,H=arguments[1]||null,E=arguments[2],D=arguments[3],N=arguments[4]||0);let it,ct,xt,Mt,Tt,Ct,bt,ne,ce;const pe=E.isCompressedTexture?E.mipmaps[N]:E.image;G!==null?(it=G.max.x-G.min.x,ct=G.max.y-G.min.y,xt=G.max.z-G.min.z,Mt=G.min.x,Tt=G.min.y,Ct=G.min.z):(it=pe.width,ct=pe.height,xt=pe.depth,Mt=0,Tt=0,Ct=0),H!==null?(bt=H.x,ne=H.y,ce=H.z):(bt=0,ne=0,ce=0);const Oe=Ut.convert(D.format),Zt=Ut.convert(D.type);let Et;if(D.isData3DTexture)R.setTexture3D(D,0),Et=L.TEXTURE_3D;else if(D.isDataArrayTexture||D.isCompressedArrayTexture)R.setTexture2DArray(D,0),Et=L.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,D.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,D.unpackAlignment);const we=L.getParameter(L.UNPACK_ROW_LENGTH),Qt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),$e=L.getParameter(L.UNPACK_SKIP_PIXELS),ui=L.getParameter(L.UNPACK_SKIP_ROWS),Be=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,pe.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,pe.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Mt),L.pixelStorei(L.UNPACK_SKIP_ROWS,Tt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ct),E.isDataTexture||E.isData3DTexture?L.texSubImage3D(Et,N,bt,ne,ce,it,ct,xt,Oe,Zt,pe.data):D.isCompressedArrayTexture?L.compressedTexSubImage3D(Et,N,bt,ne,ce,it,ct,xt,Oe,pe.data):L.texSubImage3D(Et,N,bt,ne,ce,it,ct,xt,Oe,Zt,pe),L.pixelStorei(L.UNPACK_ROW_LENGTH,we),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Qt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,$e),L.pixelStorei(L.UNPACK_SKIP_ROWS,ui),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Be),N===0&&D.generateMipmaps&&L.generateMipmap(Et),Pt.unbindTexture()},this.initRenderTarget=function(E){Dt.get(E).__webglFramebuffer===void 0&&R.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?R.setTextureCube(E,0):E.isData3DTexture?R.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?R.setTexture2DArray(E,0):R.setTexture2D(E,0),Pt.unbindTexture()},this.resetState=function(){C=0,T=0,w=null,Pt.reset(),re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return An}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Lo?"display-p3":"srgb",e.unpackColorSpace=Kt.workingColorSpace===Pr?"display-p3":"srgb"}}class Oo{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new yt(t),this.density=e}clone(){return new Oo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class zg extends oe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new dn,this.environmentIntensity=1,this.environmentRotation=new dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class rh{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=fo,this.updateRanges=[],this.version=0,this.uuid=an()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=an()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=an()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ce=new A;class ws{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ce.fromBufferAttribute(this,e),Ce.applyMatrix4(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ce.fromBufferAttribute(this,e),Ce.applyNormalMatrix(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ce.fromBufferAttribute(this,e),Ce.transformDirection(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=sn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ie(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ie(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ie(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ie(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ie(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=sn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=sn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=sn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=sn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ie(e,this.array),n=ie(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ie(e,this.array),n=ie(n,this.array),i=ie(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ie(e,this.array),n=ie(n,this.array),i=ie(i,this.array),s=ie(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return new ge(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new ws(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class tn extends ln{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new yt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ai;const ss=new A,Ti=new A,Ri=new A,Ci=new ft,rs=new ft,ah=new Nt,tr=new A,as=new A,er=new A,ql=new ft,pa=new ft,Kl=new ft;class cn extends oe{constructor(t=new tn){if(super(),this.isSprite=!0,this.type="Sprite",Ai===void 0){Ai=new de;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new rh(e,5);Ai.setIndex([0,1,2,0,2,3]),Ai.setAttribute("position",new ws(n,3,0,!1)),Ai.setAttribute("uv",new ws(n,2,3,!1))}this.geometry=Ai,this.material=t,this.center=new ft(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ti.setFromMatrixScale(this.matrixWorld),ah.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ri.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ti.multiplyScalar(-Ri.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const a=this.center;nr(tr.set(-.5,-.5,0),Ri,a,Ti,i,s),nr(as.set(.5,-.5,0),Ri,a,Ti,i,s),nr(er.set(.5,.5,0),Ri,a,Ti,i,s),ql.set(0,0),pa.set(1,0),Kl.set(1,1);let o=t.ray.intersectTriangle(tr,as,er,!1,ss);if(o===null&&(nr(as.set(-.5,.5,0),Ri,a,Ti,i,s),pa.set(0,1),o=t.ray.intersectTriangle(tr,er,as,!1,ss),o===null))return;const l=t.ray.origin.distanceTo(ss);l<t.near||l>t.far||e.push({distance:l,point:ss.clone(),uv:qe.getInterpolation(ss,tr,as,er,ql,pa,Kl,new ft),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function nr(r,t,e,n,i,s){Ci.subVectors(r,e).addScalar(.5).multiply(n),i!==void 0?(rs.x=s*Ci.x-i*Ci.y,rs.y=i*Ci.x+s*Ci.y):rs.copy(Ci),r.copy(t),r.x+=rs.x,r.y+=rs.y,r.applyMatrix4(ah)}const jl=new A,$l=new Jt,Jl=new Jt,Vg=new A,Zl=new Nt,ir=new A,ma=new fn,Ql=new Nt,ga=new Rs;class Wg extends wt{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=nl,this.bindMatrix=new Nt,this.bindMatrixInverse=new Nt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new je),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,ir),this.boundingBox.expandByPoint(ir)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new fn),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,ir),this.boundingSphere.expandByPoint(ir)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ma.copy(this.boundingSphere),ma.applyMatrix4(i),t.ray.intersectsSphere(ma)!==!1&&(Ql.copy(i).invert(),ga.copy(t.ray).applyMatrix4(Ql),!(this.boundingBox!==null&&ga.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,ga)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new Jt,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);const s=1/t.manhattanLength();s!==1/0?t.multiplyScalar(s):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===nl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Jh?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,i=this.geometry;$l.fromBufferAttribute(i.attributes.skinIndex,t),Jl.fromBufferAttribute(i.attributes.skinWeight,t),jl.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let s=0;s<4;s++){const a=Jl.getComponent(s);if(a!==0){const o=$l.getComponent(s);Zl.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),e.addScaledVector(Vg.copy(jl).applyMatrix4(Zl),a)}}return e.applyMatrix4(this.bindMatrixInverse)}}class oh extends oe{constructor(){super(),this.isBone=!0,this.type="Bone"}}class lh extends ye{constructor(t=null,e=1,n=1,i,s,a,o,l,c=Ie,h=Ie,u,d){super(null,a,o,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const tc=new Nt,Xg=new Nt;class Bo{constructor(t=[],e=[]){this.uuid=an(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Nt)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new Nt;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=t.length;s<a;s++){const o=t[s]?t[s].matrixWorld:Xg;tc.multiplyMatrices(o,e[s]),tc.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Bo(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new lh(e,t,t,Ke,rn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const i=this.bones[e];if(i.name===t)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){const s=t.bones[n];let a=e[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new oh),this.bones.push(a),this.boneInverses.push(new Nt().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let i=0,s=e.length;i<s;i++){const a=e[i];t.bones.push(a.uuid);const o=n[i];t.boneInverses.push(o.toArray())}return t}}class mo extends ge{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Pi=new Nt,ec=new Nt,sr=[],nc=new je,Yg=new Nt,os=new wt,ls=new fn;class qg extends wt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new mo(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Yg)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new je),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Pi),nc.copy(t.boundingBox).applyMatrix4(Pi),this.boundingBox.union(nc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new fn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Pi),ls.copy(t.boundingSphere).applyMatrix4(Pi),this.boundingSphere.union(ls)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=t*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(os.geometry=this.geometry,os.material=this.material,os.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ls.copy(this.boundingSphere),ls.applyMatrix4(n),t.ray.intersectsSphere(ls)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Pi),ec.multiplyMatrices(n,Pi),os.matrixWorld=ec,os.raycast(t,sr);for(let a=0,o=sr.length;a<o;a++){const l=sr[a];l.instanceId=s,l.object=this,e.push(l)}sr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new mo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new lh(new Float32Array(i*this.count),i,this.count,Ao,rn));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*t;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class ko extends ln{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new yt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const wr=new A,Ar=new A,ic=new Nt,cs=new Rs,rr=new fn,_a=new A,sc=new A;class Ir extends oe{constructor(t=new de,e=new ko){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,s=e.count;i<s;i++)wr.fromBufferAttribute(e,i-1),Ar.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=wr.distanceTo(Ar);t.setAttribute("lineDistance",new ee(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),rr.copy(n.boundingSphere),rr.applyMatrix4(i),rr.radius+=s,t.ray.intersectsSphere(rr)===!1)return;ic.copy(i).invert(),cs.copy(t.ray).applyMatrix4(ic);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=f,p=g-1;_<p;_+=c){const m=h.getX(_),y=h.getX(_+1),x=ar(this,t,cs,l,m,y);x&&e.push(x)}if(this.isLineLoop){const _=h.getX(g-1),p=h.getX(f),m=ar(this,t,cs,l,_,p);m&&e.push(m)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=f,p=g-1;_<p;_+=c){const m=ar(this,t,cs,l,_,_+1);m&&e.push(m)}if(this.isLineLoop){const _=ar(this,t,cs,l,g-1,f);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function ar(r,t,e,n,i,s){const a=r.geometry.attributes.position;if(wr.fromBufferAttribute(a,i),Ar.fromBufferAttribute(a,s),e.distanceSqToSegment(wr,Ar,_a,sc)>n)return;_a.applyMatrix4(r.matrixWorld);const l=t.ray.origin.distanceTo(_a);if(!(l<t.near||l>t.far))return{distance:l,point:sc.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:r}}const rc=new A,ac=new A;class Kg extends Ir{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,s=e.count;i<s;i+=2)rc.fromBufferAttribute(e,i),ac.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+rc.distanceTo(ac);t.setAttribute("lineDistance",new ee(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class jg extends Ir{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class Gn extends ln{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new yt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const oc=new Nt,go=new Rs,or=new fn,lr=new A;class ri extends oe{constructor(t=new de,e=new Gn){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),or.copy(n.boundingSphere),or.applyMatrix4(i),or.radius+=s,t.ray.intersectsSphere(or)===!1)return;oc.copy(i).invert(),go.copy(t.ray).applyMatrix4(oc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=d,_=f;g<_;g++){const p=c.getX(g);lr.fromBufferAttribute(u,p),lc(lr,p,l,i,t,e,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,_=f;g<_;g++)lr.fromBufferAttribute(u,g),lc(lr,g,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function lc(r,t,e,n,i,s,a){const o=go.distanceSqToPoint(r);if(o<e){const l=new A;go.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class qn extends ye{constructor(t,e,n,i,s,a,o,l,c){super(t,e,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Cn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),s=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const s=n.length;let a;e?a=e:a=t*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(s-1);const h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);const a=this.getPoint(i),o=this.getPoint(s),l=e||(a.isVector2?new ft:new A);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new A,i=[],s=[],a=[],o=new A,l=new Nt;for(let f=0;f<=t;f++){const g=f/t;i[f]=this.getTangentAt(g,new A)}s[0]=new A,a[0]=new A;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Ee(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(i[f],s[f])}if(e===!0){let f=Math.acos(Ee(s[0].dot(s[t]),-1,1));f/=t,i[0].dot(o.crossVectors(s[0],s[t]))>0&&(f=-f);for(let g=1;g<=t;g++)s[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],s[g])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class ch extends Cn{constructor(t=0,e=0,n=1,i=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new ft){const n=e,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(a?s=0:s=i),this.aClockwise===!0&&!a&&(s===i?s=-i:s=s-i);const o=this.aStartAngle+t*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class $g extends ch{constructor(t,e,n,i,s,a){super(t,e,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Go(){let r=0,t=0,e=0,n=0;function i(s,a,o,l){r=s,t=o,e=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,u){let d=(a-s)/c-(o-s)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(s){const a=s*s,o=a*s;return r+t*s+e*a+n*o}}}const cr=new A,va=new Go,xa=new Go,ya=new Go;class _o extends Cn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new A){const n=e,i=this.points,s=i.length,a=(s-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%s]:(cr.subVectors(i[0],i[1]).add(i[0]),c=cr);const u=i[o%s],d=i[(o+1)%s];if(this.closed||o+2<s?h=i[(o+2)%s]:(cr.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=cr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),p<1e-4&&(p=_),va.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,_,p),xa.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,_,p),ya.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,_,p)}else this.curveType==="catmullrom"&&(va.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),xa.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),ya.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(va.calc(l),xa.calc(l),ya.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new A().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function cc(r,t,e,n,i){const s=(n-t)*.5,a=(i-e)*.5,o=r*r,l=r*o;return(2*e-2*n+s+a)*l+(-3*e+3*n-2*s-a)*o+s*r+e}function Jg(r,t){const e=1-r;return e*e*t}function Zg(r,t){return 2*(1-r)*r*t}function Qg(r,t){return r*r*t}function vs(r,t,e,n){return Jg(r,t)+Zg(r,e)+Qg(r,n)}function t0(r,t){const e=1-r;return e*e*e*t}function e0(r,t){const e=1-r;return 3*e*e*r*t}function n0(r,t){return 3*(1-r)*r*r*t}function i0(r,t){return r*r*r*t}function xs(r,t,e,n,i){return t0(r,t)+e0(r,e)+n0(r,n)+i0(r,i)}class s0 extends Cn{constructor(t=new ft,e=new ft,n=new ft,i=new ft){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new ft){const n=e,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(xs(t,i.x,s.x,a.x,o.x),xs(t,i.y,s.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class r0 extends Cn{constructor(t=new A,e=new A,n=new A,i=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new A){const n=e,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(xs(t,i.x,s.x,a.x,o.x),xs(t,i.y,s.y,a.y,o.y),xs(t,i.z,s.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class a0 extends Cn{constructor(t=new ft,e=new ft){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ft){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ft){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class o0 extends Cn{constructor(t=new A,e=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new A){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new A){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class l0 extends Cn{constructor(t=new ft,e=new ft,n=new ft){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ft){const n=e,i=this.v0,s=this.v1,a=this.v2;return n.set(vs(t,i.x,s.x,a.x),vs(t,i.y,s.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class hh extends Cn{constructor(t=new A,e=new A,n=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new A){const n=e,i=this.v0,s=this.v1,a=this.v2;return n.set(vs(t,i.x,s.x,a.x),vs(t,i.y,s.y,a.y),vs(t,i.z,s.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class c0 extends Cn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ft){const n=e,i=this.points,s=(i.length-1)*t,a=Math.floor(s),o=s-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(cc(o,l.x,c.x,h.x,u.x),cc(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new ft().fromArray(i))}return this}}var h0=Object.freeze({__proto__:null,ArcCurve:$g,CatmullRomCurve3:_o,CubicBezierCurve:s0,CubicBezierCurve3:r0,EllipseCurve:ch,LineCurve:a0,LineCurve3:o0,QuadraticBezierCurve:l0,QuadraticBezierCurve3:hh,SplineCurve:c0});class ai extends de{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const s=[],a=[],o=[],l=[],c=new A,h=new ft;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/t+1)/2,h.y=(a[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new ee(a,3)),this.setAttribute("normal",new ee(o,3)),this.setAttribute("uv",new ee(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ai(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class nn extends de{constructor(t=1,e=1,n=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let g=0;const _=[],p=n/2;let m=0;y(),a===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new ee(u,3)),this.setAttribute("normal",new ee(d,3)),this.setAttribute("uv",new ee(f,2));function y(){const M=new A,C=new A;let T=0;const w=(e-t)/n;for(let P=0;P<=s;P++){const U=[],v=P/s,b=v*(e-t)+t;for(let F=0;F<=i;F++){const O=F/i,V=O*l+o,X=Math.sin(V),z=Math.cos(V);C.x=b*X,C.y=-v*n+p,C.z=b*z,u.push(C.x,C.y,C.z),M.set(X,w,z).normalize(),d.push(M.x,M.y,M.z),f.push(O,1-v),U.push(g++)}_.push(U)}for(let P=0;P<i;P++)for(let U=0;U<s;U++){const v=_[U][P],b=_[U+1][P],F=_[U+1][P+1],O=_[U][P+1];t>0&&(h.push(v,b,O),T+=3),e>0&&(h.push(b,F,O),T+=3)}c.addGroup(m,T,0),m+=T}function x(M){const C=g,T=new ft,w=new A;let P=0;const U=M===!0?t:e,v=M===!0?1:-1;for(let F=1;F<=i;F++)u.push(0,p*v,0),d.push(0,v,0),f.push(.5,.5),g++;const b=g;for(let F=0;F<=i;F++){const V=F/i*l+o,X=Math.cos(V),z=Math.sin(V);w.x=U*z,w.y=p*v,w.z=U*X,u.push(w.x,w.y,w.z),d.push(0,v,0),T.x=X*.5+.5,T.y=z*.5*v+.5,f.push(T.x,T.y),g++}for(let F=0;F<i;F++){const O=C+F,V=b+F;M===!0?h.push(V,V+1,O):h.push(V+1,V,O),P+=3}c.addGroup(m,P,M===!0?1:2),m+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class un extends nn{constructor(t=1,e=1,n=32,i=1,s=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(t){return new un(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ho extends de{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const s=[],a=[];o(i),c(n),h(),this.setAttribute("position",new ee(s,3)),this.setAttribute("normal",new ee(s.slice(),3)),this.setAttribute("uv",new ee(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const x=new A,M=new A,C=new A;for(let T=0;T<e.length;T+=3)f(e[T+0],x),f(e[T+1],M),f(e[T+2],C),l(x,M,C,y)}function l(y,x,M,C){const T=C+1,w=[];for(let P=0;P<=T;P++){w[P]=[];const U=y.clone().lerp(M,P/T),v=x.clone().lerp(M,P/T),b=T-P;for(let F=0;F<=b;F++)F===0&&P===T?w[P][F]=U:w[P][F]=U.clone().lerp(v,F/b)}for(let P=0;P<T;P++)for(let U=0;U<2*(T-P)-1;U++){const v=Math.floor(U/2);U%2===0?(d(w[P][v+1]),d(w[P+1][v]),d(w[P][v])):(d(w[P][v+1]),d(w[P+1][v+1]),d(w[P+1][v]))}}function c(y){const x=new A;for(let M=0;M<s.length;M+=3)x.x=s[M+0],x.y=s[M+1],x.z=s[M+2],x.normalize().multiplyScalar(y),s[M+0]=x.x,s[M+1]=x.y,s[M+2]=x.z}function h(){const y=new A;for(let x=0;x<s.length;x+=3){y.x=s[x+0],y.y=s[x+1],y.z=s[x+2];const M=p(y)/2/Math.PI+.5,C=m(y)/Math.PI+.5;a.push(M,1-C)}g(),u()}function u(){for(let y=0;y<a.length;y+=6){const x=a[y+0],M=a[y+2],C=a[y+4],T=Math.max(x,M,C),w=Math.min(x,M,C);T>.9&&w<.1&&(x<.2&&(a[y+0]+=1),M<.2&&(a[y+2]+=1),C<.2&&(a[y+4]+=1))}}function d(y){s.push(y.x,y.y,y.z)}function f(y,x){const M=y*3;x.x=t[M+0],x.y=t[M+1],x.z=t[M+2]}function g(){const y=new A,x=new A,M=new A,C=new A,T=new ft,w=new ft,P=new ft;for(let U=0,v=0;U<s.length;U+=9,v+=6){y.set(s[U+0],s[U+1],s[U+2]),x.set(s[U+3],s[U+4],s[U+5]),M.set(s[U+6],s[U+7],s[U+8]),T.set(a[v+0],a[v+1]),w.set(a[v+2],a[v+3]),P.set(a[v+4],a[v+5]),C.copy(y).add(x).add(M).divideScalar(3);const b=p(C);_(T,v+0,y,b),_(w,v+2,x,b),_(P,v+4,M,b)}}function _(y,x,M,C){C<0&&y.x===1&&(a[x]=y.x-1),M.x===0&&M.z===0&&(a[x]=C/2/Math.PI+.5)}function p(y){return Math.atan2(y.z,-y.x)}function m(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ho(t.vertices,t.indices,t.radius,t.details)}}class As extends Ho{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new As(t.radius,t.detail)}}class Ps extends de{constructor(t=.5,e=1,n=32,i=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let u=t;const d=(e-t)/i,f=new A,g=new ft;for(let _=0;_<=i;_++){for(let p=0;p<=n;p++){const m=s+p/n*a;f.x=u*Math.cos(m),f.y=u*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let _=0;_<i;_++){const p=_*(n+1);for(let m=0;m<n;m++){const y=m+p,x=y,M=y+n+1,C=y+n+2,T=y+1;o.push(x,M,T),o.push(M,C,T)}}this.setIndex(o),this.setAttribute("position",new ee(l,3)),this.setAttribute("normal",new ee(c,3)),this.setAttribute("uv",new ee(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ps(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Dr extends de{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new A,d=new A,f=[],g=[],_=[],p=[];for(let m=0;m<=n;m++){const y=[],x=m/n;let M=0;m===0&&a===0?M=.5/e:m===n&&l===Math.PI&&(M=-.5/e);for(let C=0;C<=e;C++){const T=C/e;u.x=-t*Math.cos(i+T*s)*Math.sin(a+x*o),u.y=t*Math.cos(a+x*o),u.z=t*Math.sin(i+T*s)*Math.sin(a+x*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),p.push(T+M,1-x),y.push(c++)}h.push(y)}for(let m=0;m<n;m++)for(let y=0;y<e;y++){const x=h[m][y+1],M=h[m][y],C=h[m+1][y],T=h[m+1][y+1];(m!==0||a>0)&&f.push(x,M,T),(m!==n-1||l<Math.PI)&&f.push(M,C,T)}this.setIndex(f),this.setAttribute("position",new ee(g,3)),this.setAttribute("normal",new ee(_,3)),this.setAttribute("uv",new ee(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Dr(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Tr extends de{constructor(t=1,e=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],l=[],c=[],h=new A,u=new A,d=new A;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){const _=g/i*s,p=f/n*Math.PI*2;u.x=(t+e*Math.cos(p))*Math.cos(_),u.y=(t+e*Math.cos(p))*Math.sin(_),u.z=e*Math.sin(p),o.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){const _=(i+1)*f+g-1,p=(i+1)*(f-1)+g-1,m=(i+1)*(f-1)+g,y=(i+1)*f+g;a.push(_,p,y),a.push(p,m,y)}this.setIndex(a),this.setAttribute("position",new ee(o,3)),this.setAttribute("normal",new ee(l,3)),this.setAttribute("uv",new ee(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Tr(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Rr extends de{constructor(t=new hh(new A(-1,-1,0),new A(-1,1,0),new A(1,1,0)),e=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:s};const a=t.computeFrenetFrames(e,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new A,l=new A,c=new ft;let h=new A;const u=[],d=[],f=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new ee(u,3)),this.setAttribute("normal",new ee(d,3)),this.setAttribute("uv",new ee(f,2));function _(){for(let x=0;x<e;x++)p(x);p(s===!1?e:0),y(),m()}function p(x){h=t.getPointAt(x/e,h);const M=a.normals[x],C=a.binormals[x];for(let T=0;T<=i;T++){const w=T/i*Math.PI*2,P=Math.sin(w),U=-Math.cos(w);l.x=U*M.x+P*C.x,l.y=U*M.y+P*C.y,l.z=U*M.z+P*C.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}function m(){for(let x=1;x<=e;x++)for(let M=1;M<=i;M++){const C=(i+1)*(x-1)+(M-1),T=(i+1)*x+(M-1),w=(i+1)*x+M,P=(i+1)*(x-1)+M;g.push(C,T,P),g.push(T,w,P)}}function y(){for(let x=0;x<=e;x++)for(let M=0;M<=i;M++)c.x=x/e,c.y=M/i,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Rr(new h0[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class He extends ln{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new yt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zc,this.normalScale=new ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class pn extends He{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ft(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ee(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new yt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new yt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new yt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}function hr(r,t,e){return!r||!e&&r.constructor===t?r:typeof t.BYTES_PER_ELEMENT=="number"?new t(r):Array.prototype.slice.call(r)}function u0(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function d0(r){function t(i,s){return r[i]-r[s]}const e=r.length,n=new Array(e);for(let i=0;i!==e;++i)n[i]=i;return n.sort(t),n}function hc(r,t,e){const n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){const o=e[s]*t;for(let l=0;l!==t;++l)i[a++]=r[o+l]}return i}function uh(r,t,e,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(t.push(s.time),e.push.apply(e,a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(t.push(s.time),a.toArray(e,e.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(t.push(s.time),e.push(a)),s=r[i++];while(s!==void 0)}class Ls{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,i=e[n],s=e[n-1];t:{e:{let a;n:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=e[++n],t<i)break e}a=e.length;break n}if(!(t>=s)){const o=e[1];t<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=e[--n-1],t>=s)break e}a=n,n=0;break n}break t}for(;n<a;){const o=n+a>>>1;t<e[o]?a=o:n=o+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let a=0;a!==i;++a)e[a]=n[s+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class f0 extends Ls{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ii,endingEnd:Ii}}intervalChanged_(t,e,n){const i=this.parameterPositions;let s=t-2,a=t+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Di:s=t,o=2*e-n;break;case yr:s=i.length-2,o=e+i[s]-i[s+1];break;default:s=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Di:a=t,l=2*n-e;break;case yr:a=1,l=n+i[1]-i[0];break;default:a=t-1,l=e}const c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(t,e,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-e)/(i-e),_=g*g,p=_*g,m=-d*p+2*d*_-d*g,y=(1+d)*p+(-1.5-2*d)*_+(-.5+d)*g+1,x=(-1-f)*p+(1.5+f)*_+.5*g,M=f*p-f*_;for(let C=0;C!==o;++C)s[C]=m*a[h+C]+y*a[c+C]+x*a[l+C]+M*a[u+C];return s}}class dh extends Ls{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(i-e),u=1-h;for(let d=0;d!==o;++d)s[d]=a[c+d]*u+a[l+d]*h;return s}}class p0 extends Ls{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}}class mn{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=hr(e,this.TimeBufferType),this.values=hr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:hr(t.times,Array),values:hr(t.values,Array)};const i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new p0(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new dh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new f0(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Ss:e=this.InterpolantFactoryMethodDiscrete;break;case bs:e=this.InterpolantFactoryMethodLinear;break;case kr:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ss;case this.InterpolantFactoryMethodLinear:return bs;case this.InterpolantFactoryMethodSmooth:return kr}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){const n=this.times,i=n.length;let s=0,a=i-1;for(;s!==i&&n[s]<t;)++s;for(;a!==-1&&n[a]>e;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==s;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(i!==void 0&&u0(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===kr,s=t.length-1;let a=1;for(let o=1;o<s;++o){let l=!1;const c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(i)l=!0;else{const u=o*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const _=e[u+g];if(_!==e[d+g]||_!==e[f+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];const u=o*n,d=a*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++a}}if(s>0){t[a]=t[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}}mn.prototype.TimeBufferType=Float32Array;mn.prototype.ValueBufferType=Float32Array;mn.prototype.DefaultInterpolation=bs;class $i extends mn{constructor(t,e,n){super(t,e,n)}}$i.prototype.ValueTypeName="bool";$i.prototype.ValueBufferType=Array;$i.prototype.DefaultInterpolation=Ss;$i.prototype.InterpolantFactoryMethodLinear=void 0;$i.prototype.InterpolantFactoryMethodSmooth=void 0;class fh extends mn{}fh.prototype.ValueTypeName="color";class Yi extends mn{}Yi.prototype.ValueTypeName="number";class m0 extends Ls{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(i-e);let c=t*o;for(let h=c+o;c!==h;c+=4)on.slerpFlat(s,0,a,c-o,a,c,l);return s}}class qi extends mn{InterpolantFactoryMethodLinear(t){return new m0(this.times,this.values,this.getValueSize(),t)}}qi.prototype.ValueTypeName="quaternion";qi.prototype.InterpolantFactoryMethodSmooth=void 0;class Ji extends mn{constructor(t,e,n){super(t,e,n)}}Ji.prototype.ValueTypeName="string";Ji.prototype.ValueBufferType=Array;Ji.prototype.DefaultInterpolation=Ss;Ji.prototype.InterpolantFactoryMethodLinear=void 0;Ji.prototype.InterpolantFactoryMethodSmooth=void 0;class Ki extends mn{}Ki.prototype.ValueTypeName="vector";class vo{constructor(t="",e=-1,n=[],i=Po){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=an(),this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,i=1/(t.fps||1);for(let a=0,o=n.length;a!==o;++a)e.push(_0(n[a]).scale(i));const s=new this(t.name,t.duration,e,t.blendMode);return s.uuid=t.uuid,s}static toJSON(t){const e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let s=0,a=n.length;s!==a;++s)e.push(mn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(t,e,n,i){const s=e.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const h=d0(l);l=hc(l,1,h),c=hc(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new Yi(".morphTargetInfluences["+e[o].name+"]",l,c).scale(1/n))}return new this(t,-1,a)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=t.length;o<l;o++){const c=t[o],h=c.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],e,n));return a}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,_){if(f.length!==0){const p=[],m=[];uh(f,p,m,g),p.length!==0&&_.push(new u(d,p,m))}},i=[],s=t.name||"default",a=t.fps||30,o=t.blendMode;let l=t.length||-1;const c=t.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(const _ in f){const p=[],m=[];for(let y=0;y!==d[g].morphTargets.length;++y){const x=d[g];p.push(x.time),m.push(x.morphTarget===_?1:0)}i.push(new Yi(".morphTargetInfluence["+_+"]",p,m))}l=f.length*a}else{const f=".bones["+e[u].name+"]";n(Ki,f+".position",d,"pos",i),n(qi,f+".quaternion",d,"rot",i),n(Ki,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,o)}resetDuration(){const t=this.tracks;let e=0;for(let n=0,i=t.length;n!==i;++n){const s=this.tracks[n];e=Math.max(e,s.times[s.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function g0(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Yi;case"vector":case"vector2":case"vector3":case"vector4":return Ki;case"color":return fh;case"quaternion":return qi;case"bool":case"boolean":return $i;case"string":return Ji}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function _0(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=g0(r.type);if(r.times===void 0){const e=[],n=[];uh(r.keys,e,n,"value"),r.times=e,r.values=n}return t.parse!==void 0?t.parse(r):new t(r.name,r.times,r.values,r.interpolation)}const zn={enabled:!1,files:{},add:function(r,t){this.enabled!==!1&&(this.files[r]=t)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class v0{constructor(t,e,n){const i=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,s===!1&&i.onStart!==void 0&&i.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const x0=new v0;class Zi{constructor(t){this.manager=t!==void 0?t:x0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Zi.DEFAULT_MATERIAL_NAME="__DEFAULT";const Sn={};class y0 extends Error{constructor(t,e){super(t),this.response=e}}class ph extends Zi{constructor(t){super(t)}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=zn.get(t);if(s!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(s),this.manager.itemEnd(t)},0),s;if(Sn[t]!==void 0){Sn[t].push({onLoad:e,onProgress:n,onError:i});return}Sn[t]=[],Sn[t].push({onLoad:e,onProgress:n,onError:i});const a=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Sn[t],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let _=0;const p=new ReadableStream({start(m){y();function y(){u.read().then(({done:x,value:M})=>{if(x)m.close();else{_+=M.byteLength;const C=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let T=0,w=h.length;T<w;T++){const P=h[T];P.onProgress&&P.onProgress(C)}m.enqueue(M),y()}},x=>{m.error(x)})}}});return new Response(p)}else throw new y0(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{zn.add(t,c);const h=Sn[t];delete Sn[t];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=Sn[t];if(h===void 0)throw this.manager.itemError(t),c;delete Sn[t];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class M0 extends Zi{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,a=zn.get(t);if(a!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(a),s.manager.itemEnd(t)},0),a;const o=Es("img");function l(){h(),zn.add(t,this),e&&e(this),s.manager.itemEnd(t)}function c(u){h(),i&&i(u),s.manager.itemError(t),s.manager.itemEnd(t)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(t),o.src=t,o}}class S0 extends Zi{constructor(t){super(t)}load(t,e,n,i){const s=new ye,a=new M0(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){s.image=o,s.needsUpdate=!0,e!==void 0&&e(s)},n,i),s}}class Nr extends oe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new yt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class b0 extends Nr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(oe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new yt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ma=new Nt,uc=new A,dc=new A;class zo{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ft(512,512),this.map=null,this.mapPass=null,this.matrix=new Nt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new No,this._frameExtents=new ft(1,1),this._viewportCount=1,this._viewports=[new Jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;uc.setFromMatrixPosition(t.matrixWorld),e.position.copy(uc),dc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(dc),e.updateMatrixWorld(),Ma.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ma),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ma)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class E0 extends zo{constructor(){super(new Le(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=Wi*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=t.distance||e.far;(n!==e.fov||i!==e.aspect||s!==e.far)&&(e.fov=n,e.aspect=i,e.far=s,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class w0 extends Nr{constructor(t,e,n=0,i=Math.PI/3,s=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(oe.DEFAULT_UP),this.updateMatrix(),this.target=new oe,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new E0}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const fc=new Nt,hs=new A,Sa=new A;class A0 extends zo{constructor(){super(new Le(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ft(4,2),this._viewportCount=6,this._viewports=[new Jt(2,1,1,1),new Jt(0,1,1,1),new Jt(3,1,1,1),new Jt(1,1,1,1),new Jt(3,0,1,1),new Jt(1,0,1,1)],this._cubeDirections=[new A(1,0,0),new A(-1,0,0),new A(0,0,1),new A(0,0,-1),new A(0,1,0),new A(0,-1,0)],this._cubeUps=[new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,0,1),new A(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),hs.setFromMatrixPosition(t.matrixWorld),n.position.copy(hs),Sa.copy(n.position),Sa.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Sa),n.updateMatrixWorld(),i.makeTranslation(-hs.x,-hs.y,-hs.z),fc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fc)}}class en extends Nr{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new A0}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class T0 extends zo{constructor(){super(new Uo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ms extends Nr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(oe.DEFAULT_UP),this.updateMatrix(),this.target=new oe,this.shadow=new T0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class ys{static decodeText(t){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let n=0,i=t.length;n<i;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch{return e}}static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}class R0 extends Zi{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(t){return this.options=t,this}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,a=zn.get(t);if(a!==void 0){if(s.manager.itemStart(t),a.then){a.then(c=>{e&&e(c),s.manager.itemEnd(t)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){e&&e(a),s.manager.itemEnd(t)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const l=fetch(t,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return zn.add(t,c),e&&e(c),s.manager.itemEnd(t),c}).catch(function(c){i&&i(c),zn.remove(t),s.manager.itemError(t),s.manager.itemEnd(t)});zn.add(t,l),s.manager.itemStart(t)}}class C0{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=pc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=pc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function pc(){return performance.now()}class P0{constructor(t,e,n){this.binding=t,this.valueSize=n;let i,s,a;switch(e){case"quaternion":i=this._slerp,s=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){const n=this.buffer,i=this.valueSize,s=t*i+i;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[s+o]=n[o];a=e}else{a+=e;const o=e/a;this._mixBufferRegion(n,s,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(t){const e=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(e,i,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){const e=this.valueSize,n=this.buffer,i=t*e+e,s=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=e*this._origIndex;this._mixBufferRegion(n,i,l,1-s,e)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*e,1,e);for(let l=e,c=e+e;l!==c;++l)if(n[l]!==n[l+e]){o.setValue(n,i);break}}saveOriginalState(){const t=this.binding,e=this.buffer,n=this.valueSize,i=n*this._origIndex;t.getValue(e,i);for(let s=n,a=i;s!==a;++s)e[s]=e[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){const t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,i,s){if(i>=.5)for(let a=0;a!==s;++a)t[e+a]=t[n+a]}_slerp(t,e,n,i){on.slerpFlat(t,e,t,e,t,n,i)}_slerpAdditive(t,e,n,i,s){const a=this._workIndex*s;on.multiplyQuaternionsFlat(t,a,t,e,t,n),on.slerpFlat(t,e,t,e,t,a,i)}_lerp(t,e,n,i,s){const a=1-i;for(let o=0;o!==s;++o){const l=e+o;t[l]=t[l]*a+t[n+o]*i}}_lerpAdditive(t,e,n,i,s){for(let a=0;a!==s;++a){const o=e+a;t[o]=t[o]+t[n+a]*i}}}const Vo="\\[\\]\\.:\\/",L0=new RegExp("["+Vo+"]","g"),Wo="[^"+Vo+"]",I0="[^"+Vo.replace("\\.","")+"]",D0=/((?:WC+[\/:])*)/.source.replace("WC",Wo),N0=/(WCOD+)?/.source.replace("WCOD",I0),U0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Wo),F0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Wo),O0=new RegExp("^"+D0+N0+U0+F0+"$"),B0=["material","materials","bones","map"];class k0{constructor(t,e,n){const i=n||te.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class te{constructor(t,e,n){this.path=e,this.parsedPath=n||te.parseTrackName(e),this.node=te.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new te.Composite(t,e,n):new te(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(L0,"")}static parseTrackName(t){const e=O0.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);B0.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===e||o.uuid===e)return o;const l=n(o.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,i=e.propertyName;let s=e.propertyIndex;if(t||(t=te.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}const a=t[i];if(a===void 0){const c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}te.Composite=k0;te.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};te.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};te.prototype.GetterByBindingType=[te.prototype._getValue_direct,te.prototype._getValue_array,te.prototype._getValue_arrayElement,te.prototype._getValue_toArray];te.prototype.SetterByBindingTypeAndVersioning=[[te.prototype._setValue_direct,te.prototype._setValue_direct_setNeedsUpdate,te.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[te.prototype._setValue_array,te.prototype._setValue_array_setNeedsUpdate,te.prototype._setValue_array_setMatrixWorldNeedsUpdate],[te.prototype._setValue_arrayElement,te.prototype._setValue_arrayElement_setNeedsUpdate,te.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[te.prototype._setValue_fromArray,te.prototype._setValue_fromArray_setNeedsUpdate,te.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class G0{constructor(t,e,n=null,i=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=i;const s=e.tracks,a=s.length,o=new Array(a),l={endingStart:Ii,endingEnd:Ii};for(let c=0;c!==a;++c){const h=s[c].createInterpolant(null);o[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Gc,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n){if(t.fadeOut(e),this.fadeIn(e),n){const i=this._clip.duration,s=t._clip.duration,a=s/i,o=i/s;t.warp(1,a,e),this.warp(o,1,e)}return this}crossFadeTo(t,e,n){return t.crossFadeFrom(this,e,n)}stopFading(){const t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){const i=this._mixer,s=i.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=s,l[1]=s+n,c[0]=t/a,c[1]=e/a,this}stopWarping(){const t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,i){if(!this.enabled){this._updateWeight(t);return}const s=this._startTime;if(s!==null){const l=(t-s)*n;l<0||n===0?e=0:(this._startTime=null,e=n*l)}e*=this._updateTimeScale(t);const a=this._updateTime(e),o=this._updateWeight(t);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Qh:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulateAdditive(o);break;case Po:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulate(i,o)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopWarping(),e===0?this.paused=!0:this.timeScale=e)}}return this._effectiveTimeScale=e,e}_updateTime(t){const e=this._clip.duration,n=this.loop;let i=this.time+t,s=this._loopCount;const a=n===Zh;if(t===0)return s===-1?i:a&&(s&1)===1?e-i:i;if(n===kc){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(i>=e)i=e;else if(i<0)i=0;else{this.time=i;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(s===-1&&(t>=0?(s=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=e||i<0){const o=Math.floor(i/e);i-=e*o,s+=Math.abs(o);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=t>0?e:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(l===1){const c=t<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=i;if(a&&(s&1)===1)return e-i}return i}_setEndings(t,e,n){const i=this._interpolantSettings;n?(i.endingStart=Di,i.endingEnd=Di):(t?i.endingStart=this.zeroSlopeAtStart?Di:Ii:i.endingStart=yr,e?i.endingEnd=this.zeroSlopeAtEnd?Di:Ii:i.endingEnd=yr)}_scheduleFading(t,e,n){const i=this._mixer,s=i.time;let a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,l=a.sampleValues;return o[0]=s,l[0]=e,o[1]=s+t,l[1]=n,this}}const H0=new Float32Array(1);class z0 extends hi{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(t,e){const n=t._localRoot||this._root,i=t._clip.tracks,s=i.length,a=t._propertyBindings,o=t._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==s;++u){const d=i[u],f=d.name;let g=h[f];if(g!==void 0)++g.referenceCount,a[u]=g;else{if(g=a[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,f));continue}const _=e&&e._propertyBindings[u].binding.parsedPath;g=new P0(te.create(n,f,_),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,f),a[u]=g}o[u].resultBuffer=g.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){const n=(t._localRoot||this._root).uuid,i=t._clip.uuid,s=this._actionsByClip[i];this._bindAction(t,s&&s.knownActions[0]),this._addInactiveAction(t,i,n)}const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){const e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){const i=this._actions,s=this._actionsByClip;let a=s[e];if(a===void 0)a={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,s[e]=a;else{const o=a.knownActions;t._byClipCacheIndex=o.length,o.push(t)}t._cacheIndex=i.length,i.push(t),a.actionByRoot[n]=t}_removeInactiveAction(t){const e=this._actions,n=e[e.length-1],i=t._cacheIndex;n._cacheIndex=i,e[i]=n,e.pop(),t._cacheIndex=null;const s=t._clip.uuid,a=this._actionsByClip,o=a[s],l=o.knownActions,c=l[l.length-1],h=t._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),t._byClipCacheIndex=null;const u=o.actionByRoot,d=(t._localRoot||this._root).uuid;delete u[d],l.length===0&&delete a[s],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(t){const e=this._actions,n=t._cacheIndex,i=this._nActiveActions++,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_takeBackAction(t){const e=this._actions,n=t._cacheIndex,i=--this._nActiveActions,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_addInactiveBinding(t,e,n){const i=this._bindingsByRootAndName,s=this._bindings;let a=i[e];a===void 0&&(a={},i[e]=a),a[n]=t,t._cacheIndex=s.length,s.push(t)}_removeInactiveBinding(t){const e=this._bindings,n=t.binding,i=n.rootNode.uuid,s=n.path,a=this._bindingsByRootAndName,o=a[i],l=e[e.length-1],c=t._cacheIndex;l._cacheIndex=c,e[c]=l,e.pop(),delete o[s],Object.keys(o).length===0&&delete a[i]}_lendBinding(t){const e=this._bindings,n=t._cacheIndex,i=this._nActiveBindings++,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_takeBackBinding(t){const e=this._bindings,n=t._cacheIndex,i=--this._nActiveBindings,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_lendControlInterpolant(){const t=this._controlInterpolants,e=this._nActiveControlInterpolants++;let n=t[e];return n===void 0&&(n=new dh(new Float32Array(2),new Float32Array(2),1,H0),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){const e=this._controlInterpolants,n=t.__cacheIndex,i=--this._nActiveControlInterpolants,s=e[i];t.__cacheIndex=i,e[i]=t,s.__cacheIndex=n,e[n]=s}clipAction(t,e,n){const i=e||this._root,s=i.uuid;let a=typeof t=="string"?vo.findByName(i,t):t;const o=a!==null?a.uuid:t,l=this._actionsByClip[o];let c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=Po),l!==void 0){const u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;const h=new G0(this,a,e,n);return this._bindAction(h,c),this._addInactiveAction(h,o,s),h}existingAction(t,e){const n=e||this._root,i=n.uuid,s=typeof t=="string"?vo.findByName(n,t):t,a=s?s.uuid:t,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){const t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;const e=this._actions,n=this._nActiveActions,i=this.time+=t,s=Math.sign(t),a=this._accuIndex^=1;for(let c=0;c!==n;++c)e[c]._update(i,t,s,a);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){const e=this._actions,n=t.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const a=s.knownActions;for(let o=0,l=a.length;o!==l;++o){const c=a[o];this._deactivateAction(c);const h=c._cacheIndex,u=e[e.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,e[h]=u,e.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(t){const e=t.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,l=o[e];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[e];if(s!==void 0)for(const a in s){const o=s[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(t,e){const n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const mc=new Nt;class V0{constructor(t,e,n=0,i=1/0){this.ray=new Rs(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Do,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return mc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(mc),this}intersectObject(t,e=!0,n=[]){return xo(t,this,n,e),n.sort(gc),n}intersectObjects(t,e=!0,n=[]){for(let i=0,s=t.length;i<s;i++)xo(t[i],this,n,e);return n.sort(gc),n}}function gc(r,t){return r.distance-t.distance}function xo(r,t,e,n){let i=!0;if(r.layers.test(t.layers)&&r.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let a=0,o=s.length;a<o;a++)xo(s[a],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:So}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=So);function W0(r){return Math.max(10,Math.round(r/10)*10)}function X0(r){const t={1:{total:12,initialDelay:7,spawnGap:3.25,burstChance:0,burstMax:1},2:{total:18,initialDelay:4.5,spawnGap:2.45,burstChance:.2,burstMax:2},3:{total:24,initialDelay:3.8,spawnGap:1.95,burstChance:.32,burstMax:2},4:{total:30,initialDelay:3.2,spawnGap:1.55,burstChance:.45,burstMax:2},5:{total:36,initialDelay:2.8,spawnGap:1.3,burstChance:.56,burstMax:3}}[r];let e;t?e=t.total:r<=9?e=40+(r-6)*5:r<=14?e=58+(r-10)*5:r<=19?e=82+(r-15)*6:r<=24?e=112+(r-20)*8:r<=29?e=150+(r-25)*9:r<=34?e=195+(r-30)*10:r<=39?e=245+(r-35)*11:r<=44?e=300+(r-40)*13:r<=49?e=365+(r-45)*15:e=480;let n=0,i=0,s=0,a=0;if(r>=10){const c=Math.min(.28,.08+(r-10)*.008);n=Math.max(3,Math.round(e*c))}if(r>=15){const c=Math.min(.24,.07+(r-15)*.007);i=Math.max(3,Math.round(e*c))}if(r>=25){const c=Math.min(.12,.035+(r-25)*.0035);s=Math.max(2,Math.round(e*c))}if(r>=35){const c=Math.min(.032,.008+(r-35)*.0015);a=Math.max(1,Math.round(e*c))}const o=Math.max(8,e-n-i-s-a),l=t??{initialDelay:r<10?2.4:r<20?2:1.55,spawnGap:r<10?Math.max(.95,1.25-(r-6)*.05):r<20?.9:r<30?.84:r<40?.78:.72,burstChance:r<10?.58:r<20?.66:r<30?.72:.78,burstMax:r<10?3:r<20?4:r<30?5:r<40?6:7};return{counts:{husk:o,strong:i,runner:n,brute:s,siege:a},total:e,maxActive:25,initialDelay:l.initialDelay,spawnGap:l.spawnGap,burstChance:l.burstChance,burstMax:l.burstMax,huskPaceVariation:r>=4}}const Y0=Array.from({length:50},(r,t)=>X0(t+1)),$=Object.freeze({assets:{husk:"./assets/husk.glb",runner:"./assets/running-crawl.glb",brute:"./assets/slow-walk.glb",siege:"./assets/skinny-monster.glb",manor:"./assets/manor.glb",shed:"./assets/shed.glb"},sounds:{ash:"./sounds/ashsound.mp3",attack:"./sounds/attacksound.mp3",background1:"./sounds/background1.mp3",background2:"./sounds/background2.mp3",bodyImpact:"./sounds/body-impact-sound.mp3",bombExplosion:"./sounds/bomb-explosion.mp3",crossbowFire:"./sounds/crossbow-fire-sound.mp3",click:"./assets/click-sound.mp3",deniedPurchase:"./sounds/denied-purchase-sound.mp3",gameOver:"./sounds/game-over-sound.mp3",endgameBang:"./assets/endgamebang.mp3",newDawn:"./assets/newdawnmusic.mp3",purchase:"./sounds/purchasesound.mp3",soulBinding:"./assets/soulmusic.mp3",soulBling:"./assets/soulbling.mp3",soulCollect:"./sounds/soulcollectsound.mp3",waveStart:"./sounds/wave-start-sound.MP3",whoosh:"./sounds/whoosh.mp3"},camera:{position:[0,9.2,27.5],target:[1.8,3.1,0],fov:44},manor:{startHealth:1e3,maxHealth:1e3,maxFortifyLevel:40,repairs:{minor:{cost:20,amount:50},major:{cost:80,amount:250},full:{cost:330,amount:1e3}},fortify:{baseCost:130,amount:100},majorFortify:{baseCost:2500,amount:1e3,levels:10}},buildings:{extraction:{cost:900,label:"SOUL EXTRACTION",unlockWave:4},extractionUpgrade2:{cost:3e3,label:"SOUL EXTRACTION II"},extractionUpgrade3:{cost:6e3,label:"SOUL EXTRACTION III"},hellfire:{cost:1800,label:"HELLFIRE BATTERY",unlockWave:4},demolition:{cost:4800,label:"HELL BOMB FORGE",unlockWave:15},undercroft:{cost:9e3,label:"UNDERCROFT",unlockWave:25},occult:{cost:18e3,label:"OCCULT TOWER",unlockWave:35}},extraction:{duration:14,maxConcurrent:3,maxLevel:3,radius:2.35},boundCaps:{hellfire:45,demolition:45,undercroft:30,occult:30},enemyTypes:{husk:{asset:"husk",height:3.65,rotationY:Math.PI/2,speed:[3.75,4.25],animationSpeed:[1.25,1.6],reward:10,attackDamage:10,attackInterval:1.45,grabBox:[1.55,4.25,1.55],grabY:1.92,throwScale:1,durability:1,convertible:!0},strong:{asset:"husk",height:3.72,rotationY:Math.PI/2,speed:[2.9,3.3],animationSpeed:[1,1.25],reward:20,attackDamage:18,attackInterval:1.55,grabBox:[1.6,4.35,1.6],grabY:1.98,throwScale:.88,durability:2,convertible:!0},runner:{asset:"runner",height:1.62,rotationY:Math.PI/2,speed:[7.8,8.9],animationSpeed:[1.1,1.55],reward:10,attackDamage:13,attackInterval:1.15,grabBox:[1.05,2.15,1.12],grabY:.92,throwScale:1.05,durability:1,convertible:!0},brute:{asset:"brute",height:5.15,rotationY:Math.PI/2,speed:[2.25,2.7],animationSpeed:[.82,1],reward:30,attackDamage:38,attackInterval:1.75,grabBox:[2.05,5.4,2.05],grabY:2.45,throwScale:.52,durability:2,convertible:!0},siege:{asset:"siege",height:14.8,rotationY:Math.PI/2,speed:[1.82,2.08],animationSpeed:[.72,.9],reward:50,attackDamage:90,attackInterval:6.8,grabBox:[5.4,12.4,7],grabY:5.3,throwScale:0,durability:5,convertible:!1,siegeStopOffset:8.4}},enemy:{spawnXMin:-24.8,spawnXMax:-23.8,groundDeathScreenFraction:.5,hardSurfaceKillSpeed:10.5,treeKillSpeed:10.5,collisionRadius:.58},defence:{turretMaxLevel:3,fireStagger:1,bombMaxCharges:3,bombSoulsPerCharge:15,hellfireMaxSouls:45,occultMaxSouls:30},pool:{husk:30,strong:19,runner:22,brute:12,siege:6,effects:44},newGamePlus:{enemySpeedMultiplier:1.14,enemyAttackMultiplier:1.2,enemyAttackIntervalMultiplier:.94,soulRewardMultiplier:1.2,waveCountMultiplier:1.25,maxActive:30,runnerWave:5,strongWave:10,bruteWave:18,siegeWave:28},ranking:{bindingMaxTarget:150,defenceDamageThresholds:[2500,5e3,8500,13e3],newGamePlusDefenceScale:1.25},helpers:{round10:W0},waves:Y0});function _c(r,t){if(t===tu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(t===uo||t===Hc){let e=r.getIndex();if(e===null){const a=[],o=r.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);r.setIndex(a),e=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=e.count-2,i=[];if(t===uo)for(let a=1;a<=n;a++)i.push(e.getX(0)),i.push(e.getX(a)),i.push(e.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(e.getX(a)),i.push(e.getX(a+1)),i.push(e.getX(a+2))):(i.push(e.getX(a+2)),i.push(e.getX(a+1)),i.push(e.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),r}class q0 extends Zi{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new Z0(e)}),this.register(function(e){return new Q0(e)}),this.register(function(e){return new l_(e)}),this.register(function(e){return new c_(e)}),this.register(function(e){return new h_(e)}),this.register(function(e){return new e_(e)}),this.register(function(e){return new n_(e)}),this.register(function(e){return new i_(e)}),this.register(function(e){return new s_(e)}),this.register(function(e){return new J0(e)}),this.register(function(e){return new r_(e)}),this.register(function(e){return new t_(e)}),this.register(function(e){return new o_(e)}),this.register(function(e){return new a_(e)}),this.register(function(e){return new j0(e)}),this.register(function(e){return new u_(e)}),this.register(function(e){return new d_(e)})}load(t,e,n,i){const s=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=ys.extractUrlBase(t);a=ys.resolveURL(c,this.path)}else a=ys.extractUrlBase(t);this.manager.itemStart(t);const o=function(c){i?i(c):console.error(c),s.manager.itemError(t),s.manager.itemEnd(t)},l=new ph(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(t,function(c){try{s.parse(c,a,function(h){e(h),s.manager.itemEnd(t)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(t){return this.dracoLoader=t,this}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,n,i){let s;const a={},o={},l=new TextDecoder;if(typeof t=="string")s=JSON.parse(t);else if(t instanceof ArrayBuffer)if(l.decode(new Uint8Array(t,0,4))===mh){try{a[Gt.KHR_BINARY_GLTF]=new f_(t)}catch(u){i&&i(u);return}s=JSON.parse(a[Gt.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(t));else s=t;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new A_(s,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case Gt.KHR_MATERIALS_UNLIT:a[u]=new $0;break;case Gt.KHR_DRACO_MESH_COMPRESSION:a[u]=new p_(s,this.dracoLoader);break;case Gt.KHR_TEXTURE_TRANSFORM:a[u]=new m_;break;case Gt.KHR_MESH_QUANTIZATION:a[u]=new g_;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(t,e){const n=this;return new Promise(function(i,s){n.parse(t,e,i,s)})}}function K0(){let r={};return{get:function(t){return r[t]},add:function(t,e){r[t]=e},remove:function(t){delete r[t]},removeAll:function(){r={}}}}const Gt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class j0{constructor(t){this.parser=t,this.name=Gt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const t=this.parser,e=this.parser.json.nodes||[];for(let n=0,i=e.length;n<i;n++){const s=e[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(t){const e=this.parser,n="light:"+t;let i=e.cache.get(n);if(i)return i;const s=e.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[t];let c;const h=new yt(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Ae);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new ms(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new en(h),c.distance=u;break;case"spot":c=new w0(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,En(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=e.createUniqueName(l.name||"light_"+t),i=Promise.resolve(c),e.cache.add(n,i),i}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){const e=this,n=this.parser,s=n.json.nodes[t],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(e.cache,o,l)})}}class $0{constructor(){this.name=Gt.KHR_MATERIALS_UNLIT}getMaterialType(){return ae}extendParams(t,e,n){const i=[];t.color=new yt(1,1,1),t.opacity=1;const s=e.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const a=s.baseColorFactor;t.color.setRGB(a[0],a[1],a[2],Ae),t.opacity=a[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(t,"map",s.baseColorTexture,fe))}return Promise.all(i)}}class J0{constructor(t){this.parser=t,this.name=Gt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){const i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(e.emissiveIntensity=s),Promise.resolve()}}class Z0{constructor(t){this.parser=t,this.name=Gt.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:pn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(e.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(e,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(e,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(e,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new ft(o,o)}return Promise.all(s)}}class Q0{constructor(t){this.parser=t,this.name=Gt.KHR_MATERIALS_DISPERSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:pn}extendMaterialParams(t,e){const i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return e.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class t_{constructor(t){this.parser=t,this.name=Gt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:pn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(e.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(e,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(e.iridescenceIOR=a.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(e,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}}class e_{constructor(t){this.parser=t,this.name=Gt.KHR_MATERIALS_SHEEN}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:pn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];e.sheenColor=new yt(0,0,0),e.sheenRoughness=0,e.sheen=1;const a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;e.sheenColor.setRGB(o[0],o[1],o[2],Ae)}return a.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(e,"sheenColorMap",a.sheenColorTexture,fe)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(e,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}}class n_{constructor(t){this.parser=t,this.name=Gt.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:pn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(e.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(e,"transmissionMap",a.transmissionTexture)),Promise.all(s)}}class i_{constructor(t){this.parser=t,this.name=Gt.KHR_MATERIALS_VOLUME}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:pn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];e.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(e,"thicknessMap",a.thicknessTexture)),e.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return e.attenuationColor=new yt().setRGB(o[0],o[1],o[2],Ae),Promise.all(s)}}class s_{constructor(t){this.parser=t,this.name=Gt.KHR_MATERIALS_IOR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:pn}extendMaterialParams(t,e){const i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return e.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class r_{constructor(t){this.parser=t,this.name=Gt.KHR_MATERIALS_SPECULAR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:pn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];e.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(e,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return e.specularColor=new yt().setRGB(o[0],o[1],o[2],Ae),a.specularColorTexture!==void 0&&s.push(n.assignTexture(e,"specularColorMap",a.specularColorTexture,fe)),Promise.all(s)}}class a_{constructor(t){this.parser=t,this.name=Gt.EXT_MATERIALS_BUMP}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:pn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return e.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(n.assignTexture(e,"bumpMap",a.bumpTexture)),Promise.all(s)}}class o_{constructor(t){this.parser=t,this.name=Gt.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:pn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(e.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(e.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(n.assignTexture(e,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}}class l_{constructor(t){this.parser=t,this.name=Gt.KHR_TEXTURE_BASISU}loadTexture(t){const e=this.parser,n=e.json,i=n.textures[t];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],a=e.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,s.source,a)}}class c_{constructor(t){this.parser=t,this.name=Gt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,i=n.json,s=i.textures[t];if(!s.extensions||!s.extensions[e])return null;const a=s.extensions[e],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(t,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class h_{constructor(t){this.parser=t,this.name=Gt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,i=n.json,s=i.textures[t];if(!s.extensions||!s.extensions[e])return null;const a=s.extensions[e],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(t,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class u_{constructor(t){this.name=Gt.EXT_MESHOPT_COMPRESSION,this.parser=t}loadBufferView(t){const e=this.parser.json,n=e.bufferViews[t];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class d_{constructor(t){this.name=Gt.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){const e=this.parser.json,n=e.nodes[t];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=e.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==Xe.TRIANGLES&&c.mode!==Xe.TRIANGLE_STRIP&&c.mode!==Xe.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(t)),Promise.all(o).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const g of u){const _=new Nt,p=new A,m=new on,y=new A(1,1,1),x=new qg(g.geometry,g.material,d);for(let M=0;M<d;M++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,M),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,M),l.SCALE&&y.fromBufferAttribute(l.SCALE,M),x.setMatrixAt(M,_.compose(p,m,y));for(const M in l)if(M==="_COLOR_0"){const C=l[M];x.instanceColor=new mo(C.array,C.itemSize,C.normalized)}else M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&g.geometry.setAttribute(M,l[M]);oe.prototype.copy.call(x,g),this.parser.assignFinalMaterial(x),f.push(x)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const mh="glTF",us=12,vc={JSON:1313821514,BIN:5130562};class f_{constructor(t){this.name=Gt.KHR_BINARY_GLTF,this.content=null,this.body=null;const e=new DataView(t,0,us),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==mh)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-us,s=new DataView(t,us);let a=0;for(;a<i;){const o=s.getUint32(a,!0);a+=4;const l=s.getUint32(a,!0);if(a+=4,l===vc.JSON){const c=new Uint8Array(t,us+a,o);this.content=n.decode(c)}else if(l===vc.BIN){const c=us+a;this.body=t.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class p_{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Gt.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){const n=this.json,i=this.dracoLoader,s=t.extensions[this.name].bufferView,a=t.extensions[this.name].attributes,o={},l={},c={};for(const h in a){const u=yo[h]||h.toLowerCase();o[u]=a[h]}for(const h in t.attributes){const u=yo[h]||h.toLowerCase();if(a[h]!==void 0){const d=n.accessors[t.attributes[h]],f=Bi[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return e.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const g in f.attributes){const _=f.attributes[g],p=l[g];p!==void 0&&(_.normalized=p)}u(f)},o,c,Ae,d)})})}}class m_{constructor(){this.name=Gt.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){return(e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0||(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),t.needsUpdate=!0),t}}class g_{constructor(){this.name=Gt.KHR_MESH_QUANTIZATION}}class gh extends Ls{constructor(t,e,n,i){super(t,e,n,i)}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i*3+i;for(let a=0;a!==i;a++)e[a]=n[s+a];return e}interpolate_(t,e,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=i-e,u=(n-e)/h,d=u*u,f=d*u,g=t*c,_=g-c,p=-2*f+3*d,m=f-d,y=1-p,x=m-d+u;for(let M=0;M!==o;M++){const C=a[_+M+o],T=a[_+M+l]*h,w=a[g+M+o],P=a[g+M]*h;s[M]=y*C+x*T+p*w+m*P}return s}}const __=new on;class v_ extends gh{interpolate_(t,e,n,i){const s=super.interpolate_(t,e,n,i);return __.fromArray(s).normalize().toArray(s),s}}const Xe={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Bi={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},xc={9728:Ie,9729:ze,9984:Cc,9985:ur,9986:fs,9987:wn},yc={33071:Hn,33648:xr,10497:Xn},ba={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},yo={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},On={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},x_={CUBICSPLINE:void 0,LINEAR:bs,STEP:Ss},Ea={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function y_(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new He({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Tn})),r.DefaultMaterial}function ei(r,t,e){for(const n in e.extensions)r[n]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[n]=e.extensions[n])}function En(r,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(r.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function M_(r,t,e){let n=!1,i=!1,s=!1;for(let c=0,h=t.length;c<h;c++){const u=t[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const a=[],o=[],l=[];for(let c=0,h=t.length;c<h;c++){const u=t[c];if(n){const d=u.POSITION!==void 0?e.getDependency("accessor",u.POSITION):r.attributes.position;a.push(d)}if(i){const d=u.NORMAL!==void 0?e.getDependency("accessor",u.NORMAL):r.attributes.normal;o.push(d)}if(s){const d=u.COLOR_0!==void 0?e.getDependency("accessor",u.COLOR_0):r.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function S_(r,t){if(r.updateMorphTargets(),t.weights!==void 0)for(let e=0,n=t.weights.length;e<n;e++)r.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){const e=t.extras.targetNames;if(r.morphTargetInfluences.length===e.length){r.morphTargetDictionary={};for(let n=0,i=e.length;n<i;n++)r.morphTargetDictionary[e[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function b_(r){let t;const e=r.extensions&&r.extensions[Gt.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+wa(e.attributes):t=r.indices+":"+wa(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)t+=":"+wa(r.targets[n]);return t}function wa(r){let t="";const e=Object.keys(r).sort();for(let n=0,i=e.length;n<i;n++)t+=e[n]+":"+r[e[n]]+";";return t}function Mo(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function E_(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const w_=new Nt;class A_{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new K0,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&a<98?this.textureLoader=new S0(this.options.manager):this.textureLoader=new R0(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ph(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return ei(s,o,i),En(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();t(o)})}).catch(e)}_markDefs(){const t=this.json.nodes||[],e=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=e.length;i<s;i++){const a=e[i].joints;for(let o=0,l=a.length;o<l;o++)t[a[o]].isBone=!0}for(let i=0,s=t.length;i<s;i++){const a=t[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,n){if(t.refs[e]<=1)return n;const i=n.clone(),s=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,h]of a.children.entries())s(h,o.children[c])};return s(n,i),i.name+="_instance_"+t.uses[e]++,i}_invokeOne(t){const e=Object.values(this.plugins);e.push(this);for(let n=0;n<e.length;n++){const i=t(e[n]);if(i)return i}return null}_invokeAll(t){const e=Object.values(this.plugins);e.unshift(this);const n=[];for(let i=0;i<e.length;i++){const s=t(e[i]);s&&n.push(s)}return n}getDependency(t,e){const n=t+":"+e;let i=this.cache.get(n);if(!i){switch(t){case"scene":i=this.loadScene(e);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(e)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(e)});break;case"accessor":i=this.loadAccessor(e);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(e)});break;case"buffer":i=this.loadBuffer(e);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(e)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(e)});break;case"skin":i=this.loadSkin(e);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(e)});break;case"camera":i=this.loadCamera(e);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(t,e)}),!i)throw new Error("Unknown type: "+t);break}this.cache.add(n,i)}return i}getDependencies(t){let e=this.cache.get(t);if(!e){const n=this,i=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(i.map(function(s,a){return n.getDependency(t,a)})),this.cache.add(t,e)}return e}loadBuffer(t){const e=this.json.buffers[t],n=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[Gt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,a){n.load(ys.resolveURL(e.uri,i.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){const e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(n){const i=e.byteLength||0,s=e.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(t){const e=this,n=this.json,i=this.json.accessors[t];if(i.bufferView===void 0&&i.sparse===void 0){const a=ba[i.type],o=Bi[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new ge(c,a,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(a){const o=a[0],l=ba[i.type],c=Bi[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,p;if(f&&f!==u){const m=Math.floor(d/f),y="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let x=e.cache.get(y);x||(_=new c(o,m*f,i.count*f/h),x=new rh(_,f/h),e.cache.add(y,x)),p=new ws(x,l,d%f/h,g)}else o===null?_=new c(i.count*l):_=new c(o,d,i.count*l),p=new ge(_,l,g);if(i.sparse!==void 0){const m=ba.SCALAR,y=Bi[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,M=i.sparse.values.byteOffset||0,C=new y(a[1],x,i.sparse.count*m),T=new c(a[2],M,i.sparse.count*l);o!==null&&(p=new ge(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let w=0,P=C.length;w<P;w++){const U=C[w];if(p.setX(U,T[w*l]),l>=2&&p.setY(U,T[w*l+1]),l>=3&&p.setZ(U,T[w*l+2]),l>=4&&p.setW(U,T[w*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=g}return p})}loadTexture(t){const e=this.json,n=this.options,s=e.textures[t].source,a=e.images[s];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(t,s,o)}loadTextureImage(t,e,n){const i=this,s=this.json,a=s.textures[t],o=s.images[e],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(e,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(s.samplers||{})[a.sampler]||{};return h.magFilter=xc[d.magFilter]||ze,h.minFilter=xc[d.minFilter]||wn,h.wrapS=yc[d.wrapS]||Xn,h.wrapT=yc[d.wrapT]||Xn,i.associations.set(h,{textures:t}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(t,e){const n=this,i=this.json,s=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(u=>u.clone());const a=i.images[t],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;e.isImageBitmapLoader===!0&&(g=function(_){const p=new ye(_);p.needsUpdate=!0,d(p)}),e.load(ys.resolveURL(u,s.path),g,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),En(u,a),u.userData.mimeType=a.mimeType||E_(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[t]=h,h}assignTexture(t,e,n,i){const s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[Gt.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[Gt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=s.associations.get(a);a=s.extensions[Gt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),t[e]=a,a})}assignFinalMaterial(t){const e=t.geometry;let n=t.material;const i=e.attributes.tangent===void 0,s=e.attributes.color!==void 0,a=e.attributes.normal===void 0;if(t.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new Gn,ln.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(t.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new ko,ln.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||s||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),s&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}t.material=n}getMaterialType(){return He}loadMaterial(t){const e=this,n=this.json,i=this.extensions,s=n.materials[t];let a;const o={},l=s.extensions||{},c=[];if(l[Gt.KHR_MATERIALS_UNLIT]){const u=i[Gt.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,s,e))}else{const u=s.pbrMetallicRoughness||{};if(o.color=new yt(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Ae),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(e.assignTexture(o,"map",u.baseColorTexture,fe)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(e.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(e.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(t)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(t,o)})))}s.doubleSided===!0&&(o.side=xe);const h=s.alphaMode||Ea.OPAQUE;if(h===Ea.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Ea.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==ae&&(c.push(e.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new ft(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;o.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&a!==ae&&(c.push(e.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==ae){const u=s.emissiveFactor;o.emissive=new yt().setRGB(u[0],u[1],u[2],Ae)}return s.emissiveTexture!==void 0&&a!==ae&&c.push(e.assignTexture(o,"emissiveMap",s.emissiveTexture,fe)),Promise.all(c).then(function(){const u=new a(o);return s.name&&(u.name=s.name),En(u,s),e.associations.set(u,{materials:t}),s.extensions&&ei(i,u,s),u})}createUniqueName(t){const e=te.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){const e=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[Gt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,e).then(function(l){return Mc(l,o,e)})}const a=[];for(let o=0,l=t.length;o<l;o++){const c=t[o],h=b_(c),u=i[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[Gt.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=Mc(new de,c,e),i[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(t){const e=this,n=this.json,i=this.extensions,s=n.meshes[t],a=s.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const h=a[l].material===void 0?y_(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(e.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const _=h[f],p=a[f];let m;const y=c[f];if(p.mode===Xe.TRIANGLES||p.mode===Xe.TRIANGLE_STRIP||p.mode===Xe.TRIANGLE_FAN||p.mode===void 0)m=s.isSkinnedMesh===!0?new Wg(_,y):new wt(_,y),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),p.mode===Xe.TRIANGLE_STRIP?m.geometry=_c(m.geometry,Hc):p.mode===Xe.TRIANGLE_FAN&&(m.geometry=_c(m.geometry,uo));else if(p.mode===Xe.LINES)m=new Kg(_,y);else if(p.mode===Xe.LINE_STRIP)m=new Ir(_,y);else if(p.mode===Xe.LINE_LOOP)m=new jg(_,y);else if(p.mode===Xe.POINTS)m=new ri(_,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(m.geometry.morphAttributes).length>0&&S_(m,s),m.name=e.createUniqueName(s.name||"mesh_"+t),En(m,s),p.extensions&&ei(i,m,p),e.assignFinalMaterial(m),u.push(m)}for(let f=0,g=u.length;f<g;f++)e.associations.set(u[f],{meshes:t,primitives:f});if(u.length===1)return s.extensions&&ei(i,u[0],s),u[0];const d=new se;s.extensions&&ei(i,d,s),e.associations.set(d,{meshes:t});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(t){let e;const n=this.json.cameras[t],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?e=new Le(Q.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(e=new Uo(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(e.name=this.createUniqueName(n.name)),En(e,n),Promise.resolve(e)}loadSkin(t){const e=this.json.skins[t],n=[];for(let i=0,s=e.joints.length;i<s;i++)n.push(this._loadNodeShallow(e.joints[i]));return e.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",e.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),a=i,o=[],l=[];for(let c=0,h=a.length;c<h;c++){const u=a[c];if(u){o.push(u);const d=new Nt;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[c])}return new Bo(o,l)})}loadAnimation(t){const e=this.json,n=this,i=e.animations[t],s=i.name?i.name:"animation_"+t,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],g=i.samplers[f.sampler],_=f.target,p=_.node,m=i.parameters!==void 0?i.parameters[g.input]:g.input,y=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(a.push(this.getDependency("node",p)),o.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",y)),c.push(g),h.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],g=u[2],_=u[3],p=u[4],m=[];for(let y=0,x=d.length;y<x;y++){const M=d[y],C=f[y],T=g[y],w=_[y],P=p[y];if(M===void 0)continue;M.updateMatrix&&M.updateMatrix();const U=n._createAnimationTracks(M,C,T,w,P);if(U)for(let v=0;v<U.length;v++)m.push(U[v])}return new vo(s,void 0,m)})}createNodeMesh(t){const e=this.json,n=this,i=e.nodes[t];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const a=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(t){const e=this.json,n=this,i=e.nodes[t],s=n._loadNodeShallow(t),a=[],o=i.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(a),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,w_)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(t){const e=this.json,n=this.extensions,i=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];const s=e.nodes[t],a=s.name?i.createUniqueName(s.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(t)});return l&&o.push(l),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(t)}).forEach(function(c){o.push(c)}),this.nodeCache[t]=Promise.all(o).then(function(c){let h;if(s.isBone===!0?h=new oh:c.length>1?h=new se:c.length===1?h=c[0]:h=new oe,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=a),En(h,s),s.extensions&&ei(n,h,s),s.matrix!==void 0){const u=new Nt;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=t,h}),this.nodeCache[t]}loadScene(t){const e=this.extensions,n=this.json.scenes[t],i=this,s=new se;n.name&&(s.name=i.createUniqueName(n.name)),En(s,n),n.extensions&&ei(e,s,n);const a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof ln||d instanceof ye)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(s),s})}_createAnimationTracks(t,e,n,i,s){const a=[],o=t.name?t.name:t.uuid,l=[];On[s.path]===On.weights?t.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(On[s.path]){case On.weights:c=Yi;break;case On.rotation:c=qi;break;case On.position:case On.scale:c=Ki;break;default:switch(n.itemSize){case 1:c=Yi;break;case 2:case 3:default:c=Ki;break}break}const h=i.interpolation!==void 0?x_[i.interpolation]:bs,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const g=new c(l[d]+"."+On[s.path],e.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){const n=Mo(e.constructor),i=new Float32Array(e.length);for(let s=0,a=e.length;s<a;s++)i[s]=e[s]*n;e=i}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(n){const i=this instanceof qi?v_:gh;return new i(this.times,this.values,this.getValueSize()/3,n)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function T_(r,t,e){const n=t.attributes,i=new je;if(n.POSITION!==void 0){const o=e.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new A(l[0],l[1],l[2]),new A(c[0],c[1],c[2])),o.normalized){const h=Mo(Bi[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=t.targets;if(s!==void 0){const o=new A,l=new A;for(let c=0,h=s.length;c<h;c++){const u=s[c];if(u.POSITION!==void 0){const d=e.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const _=Mo(Bi[d.componentType]);l.multiplyScalar(_)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}r.boundingBox=i;const a=new fn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=a}function Mc(r,t,e){const n=t.attributes,i=[];function s(a,o){return e.getDependency("accessor",a).then(function(l){r.setAttribute(o,l)})}for(const a in n){const o=yo[a]||a.toLowerCase();o in r.attributes||i.push(s(n[a],o))}if(t.indices!==void 0&&!r.index){const a=e.getDependency("accessor",t.indices).then(function(o){r.setIndex(o)});i.push(a)}return Kt.workingColorSpace!==Ae&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Kt.workingColorSpace}" not supported.`),En(r,t),T_(r,t,e),Promise.all(i).then(function(){return t.targets!==void 0?M_(r,t.targets,e):r})}function R_(r){const t=new Map,e=new Map,n=r.clone();return _h(r,n,function(i,s){t.set(s,i),e.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const s=i,a=t.get(i),o=a.skeleton.bones;s.skeleton=a.skeleton.clone(),s.bindMatrix.copy(a.bindMatrix),s.skeleton.bones=o.map(function(l){return e.get(l)}),s.bind(s.skeleton,s.bindMatrix)}),n}function _h(r,t,e){e(r,t);for(let n=0;n<r.children.length;n++)_h(r.children[n],t.children[n],e)}class oi{constructor(){this.loader=new q0,this.assets=new Map,this.materialVariants=new Map}async loadAll(t=null){const e=["husk","manor","runner","brute","siege","shed"];let n=0;for(const i of e){const s=$.assets[i];if(s){try{const a=await this.loadAssetWithRetry(i,s,3);this.assets.set(i,a)}catch(a){const o=s.split("/").pop()??s,l=new Error(`CORE ASSET FAILED: ${o} — ${a?.message??"Unknown loading error"}`);throw l.assetKey=i,l.assetUrl=s,l.assetFilename=o,l}n+=1,t?.(n/e.length,i)}}}async loadAssetWithRetry(t,e,n=3){let i=null;for(let s=1;s<=n;s+=1)try{const a=await fetch(e,{cache:s===1?"default":"reload"});if(!a.ok)throw new Error(`${a.status} ${a.statusText}`);const o=await a.arrayBuffer();if(o.byteLength<100)throw new Error(`File response was only ${o.byteLength} bytes`);const l=new URL(e,window.location.href),c=l.href.lastIndexOf("/"),h=c>=0?l.href.slice(0,c+1):"./";return await this.loader.parseAsync(o,h)}catch(a){i=a,console.warn(`GLB load attempt ${s}/${n} failed for ${t}: ${e}`,a),s<n&&await new Promise(o=>window.setTimeout(o,300*s))}throw i??new Error(`Unknown GLB loading error for ${t}`)}getAsset(t){const e=this.assets.get(t);if(!e)throw new Error(`Asset has not loaded: ${t}`);return e}createEnemyClone(t){const e=$.enemyTypes[t];if(!e)throw new Error(`Unknown enemy type: ${t}`);const n=this.getAsset(e.asset),i=R_(n.scene);return i.traverse(s=>{if(!s.isMesh||!s.material)return;const o=(Array.isArray(s.material)?s.material:[s.material]).map(l=>this.getEnemyMaterial(l,t));s.material=Array.isArray(s.material)?o:o[0]}),{scene:i,animations:n.animations??[]}}getEnemyMaterial(t,e){const n=`${e}:${t.uuid}`;if(this.materialVariants.has(n))return this.materialVariants.get(n);const i=t.clone();return e==="strong"?(i.color&&i.color.multiply(new yt(.72,.46,.38)),"emissive"in i&&(i.emissive=new yt(6099975),i.emissiveIntensity=.5)):e==="runner"?"emissive"in i&&(i.emissive=new yt(2758416),i.emissiveIntensity=.22):e==="brute"?(i.color&&i.color.multiplyScalar(.82),"emissive"in i&&(i.emissive=new yt(1843239),i.emissiveIntensity=.18)):e==="siege"?(i.color&&i.color.multiply(new yt(.42,.46,.54)),"emissive"in i&&(i.emissive=new yt(2429998),i.emissiveIntensity=.12)):"emissive"in i&&(i.emissive=new yt(1319479),i.emissiveIntensity=.24),this.materialVariants.set(n,i),i}createManorClone(){return this.getAsset("manor").scene.clone(!0)}createShedClone(){return this.getAsset("shed").scene.clone(!0)}static prepareModel(t){t.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0)})}static fitModelToHeight(t,e,n=0){t.rotation.y=n,t.updateMatrixWorld(!0);const s=new je().setFromObject(t).getSize(new A);t.scale.setScalar(e/Math.max(s.y,.001)),t.updateMatrixWorld(!0);const a=new je().setFromObject(t),o=a.getCenter(new A);return t.position.x-=o.x,t.position.z-=o.z,t.position.y-=a.min.y,t.updateMatrixWorld(!0),t}}function C_(){const r=document.createElement("canvas");r.width=256,r.height=256;const t=r.getContext("2d"),e=t.createRadialGradient(128,128,26,128,128,96);e.addColorStop(0,"rgba(249,246,231,0.98)"),e.addColorStop(.62,"rgba(216,221,214,0.96)"),e.addColorStop(.84,"rgba(144,156,170,0.34)"),e.addColorStop(1,"rgba(144,156,170,0)"),t.fillStyle=e,t.fillRect(0,0,256,256),t.globalCompositeOperation="multiply";const n=[[81,92,18,.2],[151,68,12,.18],[164,142,25,.17],[101,164,11,.14],[130,115,8,.12],[96,122,6,.13]];for(const[s,a,o,l]of n)t.fillStyle=`rgba(60,70,78,${l})`,t.beginPath(),t.arc(s,a,o,0,Math.PI*2),t.fill();const i=new qn(r);return i.colorSpace=fe,i}function P_(){const r=document.createElement("canvas");r.width=512,r.height=192;const t=r.getContext("2d");t.clearRect(0,0,r.width,r.height);const e=[[85,105,75,36],[155,82,105,48],[250,92,125,56],[345,78,108,48],[430,104,80,34]];for(const[i,s,a,o]of e){const l=t.createRadialGradient(i,s,0,i,s,a);l.addColorStop(0,"rgba(178,187,205,.42)"),l.addColorStop(.45,"rgba(105,113,132,.27)"),l.addColorStop(1,"rgba(33,36,48,0)"),t.save(),t.translate(i,s),t.scale(1,o/a),t.fillStyle=l,t.beginPath(),t.arc(0,0,a,0,Math.PI*2),t.fill(),t.restore()}const n=new qn(r);return n.colorSpace=fe,n}function Aa(){const r=document.createElement("canvas");r.width=512,r.height=256;const t=r.getContext("2d");t.clearRect(0,0,r.width,r.height);const e=t.createRadialGradient(256,132,18,256,132,230);e.addColorStop(0,"rgba(232,237,242,.42)"),e.addColorStop(.35,"rgba(215,222,230,.28)"),e.addColorStop(.7,"rgba(196,205,216,.12)"),e.addColorStop(1,"rgba(185,194,205,0)"),t.save(),t.translate(256,132),t.scale(1,.43),t.fillStyle=e,t.beginPath(),t.arc(0,0,230,0,Math.PI*2),t.fill(),t.restore();for(let i=0;i<12;i+=1){const s=80+Math.random()*350,a=90+Math.random()*80,o=45+Math.random()*65,l=t.createRadialGradient(s,a,0,s,a,o);l.addColorStop(0,"rgba(240,243,247,.16)"),l.addColorStop(1,"rgba(230,235,240,0)"),t.fillStyle=l,t.beginPath(),t.arc(s,a,o,0,Math.PI*2),t.fill()}const n=new qn(r);return n.colorSpace=fe,n}function L_(){const r=document.createElement("canvas");r.width=1024,r.height=512;const t=r.getContext("2d"),e=t.createLinearGradient(0,0,0,r.height);e.addColorStop(0,"#15161a"),e.addColorStop(.45,"#111217"),e.addColorStop(1,"#0c0d11"),t.fillStyle=e,t.fillRect(0,0,r.width,r.height);for(let s=0;s<1500;s+=1){const a=.018+Math.random()*.05,o=1+Math.random()*3.5;t.fillStyle=`rgba(255,255,255,${a})`,t.beginPath(),t.arc(Math.random()*r.width,Math.random()*r.height,o,0,Math.PI*2),t.fill()}for(let s=0;s<280;s+=1){const a=Math.random()*r.width,o=Math.random()*r.height,l=40+Math.random()*180,c=18+Math.random()*60,h=t.createRadialGradient(a,o,0,a,o,l*.7);h.addColorStop(0,`rgba(70,62,54,${.04+Math.random()*.06})`),h.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=h,t.fillRect(a-l/2,o-c/2,l,c)}t.lineCap="round";for(let s=0;s<75;s+=1){const a=Math.random()*r.width,o=Math.random()*r.height,l=24+Math.random()*90,c=Math.random()*Math.PI*2;t.strokeStyle=`rgba(14,14,18,${.25+Math.random()*.26})`,t.lineWidth=1+Math.random()*1.5,t.beginPath(),t.moveTo(a,o),t.lineTo(a+Math.cos(c)*l,o+Math.sin(c)*l*.35),t.stroke()}const n=t.createRadialGradient(0,r.height*.65,0,90,r.height*.65,240);n.addColorStop(0,"rgba(255,112,49,.24)"),n.addColorStop(1,"rgba(255,112,49,0)"),t.fillStyle=n,t.fillRect(0,r.height*.2,320,r.height*.8);const i=new qn(r);return i.colorSpace=fe,i.wrapS=Xn,i.wrapT=Xn,i.repeat.set(4.8,2.2),i}function I_(r,t,e,n=.16){r.opacity=Math.max(.05,n+Math.sin(t*.24+e)*.028)}function D_(){const r=document.createElement("canvas");r.width=256,r.height=256;const t=r.getContext("2d");t.clearRect(0,0,256,256);const e=t.createRadialGradient(128,128,4,128,128,124);e.addColorStop(0,"rgba(255,255,245,1)"),e.addColorStop(.18,"rgba(255,224,162,.98)"),e.addColorStop(.48,"rgba(255,137,57,.78)"),e.addColorStop(.74,"rgba(255,77,20,.34)"),e.addColorStop(1,"rgba(255,77,20,0)"),t.fillStyle=e,t.fillRect(0,0,256,256),t.globalCompositeOperation="screen";for(let i=0;i<7;i+=1){t.strokeStyle=`rgba(255,238,188,${.16+i*.035})`,t.lineWidth=2+i%3,t.beginPath();const s=32+i*10,a=i*.62;t.arc(128,128,s,a,a+Math.PI*(.7+i%2*.35)),t.stroke()}const n=new qn(r);return n.colorSpace=fe,n}function N_(){const r=document.createElement("canvas");r.width=192,r.height=192;const t=r.getContext("2d");t.clearRect(0,0,192,192);const e=t.createRadialGradient(96,96,5,96,96,92);e.addColorStop(0,"rgba(205,190,168,.72)"),e.addColorStop(.32,"rgba(150,137,122,.48)"),e.addColorStop(.68,"rgba(92,85,80,.20)"),e.addColorStop(1,"rgba(70,67,66,0)"),t.fillStyle=e,t.fillRect(0,0,192,192);const n=new qn(r);return n.colorSpace=fe,n}class U_{constructor(t,e,{mobile:n=!1}={}){this.scene=t,this.assets=e,this.mobile=!!n,this.disposables=[],this.flames=[],this.treeColliders=[],this.manorHolder=null,this.manorBounds=new je,this.manorBarrierX=13,this.turretMounts=[],this.skyClouds=[],this.groundFog=[],this.riftEmbers=null,this.riftEmberBase=null,this.extractionGroup=null,this.extractionCentre=new A,this.extractionBeams=[],this.extractionCapacity=0,this.extractionCompletions=0,this.upgradeGroups={},this.fortifyGroups=[],this.occultPulseTimer=0,this.occultStrikes=[],this.manorDustBursts=[],this.dawnActive=!1,this.dawnProgress=0,this.dawnSun=null,this.dawnLight=null,this.dawnBirds=[],this.newGamePlus=!1,this.ngPlusEmbers=null,this.ngPlusEmberBase=null,this.ngPlusSkyGlow=null,this.victoryClosing=!1,this.victoryTimer=0,this.victoryDawnStarted=!1,this.createMaterials(),this.createSky(),this.createLights(),this.createGround(),this.createHellRift(),this.createForest(),this.createGroundFog(),this.prepareDawnAssets()}async load(){this.loadManor()}createMaterials(){const t=L_();this.materials={earth:new He({color:1381914,roughness:.96,metalness:.03,map:t}),forest:new He({color:855827,roughness:1}),iron:new He({color:1053207,roughness:.48,metalness:.78}),ember:new He({color:16738085,emissive:16723720,emissiveIntensity:4.2,roughness:.3}),rift:new ae({color:16727306,transparent:!0,opacity:.86,blending:he,depthWrite:!1,side:xe}),riftHot:new ae({color:16757340,transparent:!0,opacity:.96,blending:he,depthWrite:!1,side:xe}),crater:new ae({color:525316,transparent:!0,opacity:.52,depthWrite:!1,side:xe})},this.disposables.push(t,...Object.values(this.materials))}createSky(){const t=this.mobile?130:190,e=new Float32Array(t*3);for(let p=0;p<t;p+=1)e[p*3]=Q.randFloat(-38,38),e[p*3+1]=Q.randFloat(10,27),e[p*3+2]=Q.randFloat(-48,-32);const n=new de;n.setAttribute("position",new ge(e,3));const i=new Gn({color:14542834,size:.11,transparent:!0,opacity:.86,depthWrite:!1,fog:!1});this.stars=new ri(n,i),this.stars.renderOrder=-5,this.scene.add(this.stars),this.disposables.push(n,i);const s=C_(),a=new tn({map:s,transparent:!0,opacity:.78,depthWrite:!1,fog:!1});this.moon=new cn(a),this.moon.position.set(-8.2,17.2,-36),this.moon.scale.set(5,5,1),this.scene.add(this.moon),this.disposables.push(s,a);const o=P_();[[-15,15.5,-33,21,6.1,.2,.16],[2,18.4,-37,18,5.2,.16,.1],[14,14.5,-34,23,6.6,.22,.13],[-2,12.3,-31,17,4.8,.12,.18],[24,20.2,-41,20,5.7,.14,.08]].forEach(([p,m,y,x,M,C,T],w)=>{const P=new tn({map:o,color:w%2===0?8556709:7305355,transparent:!0,opacity:C,depthWrite:!1,fog:!1}),U=new cn(P);U.position.set(p,m,y),U.scale.set(x,M,1),this.scene.add(U),this.skyClouds.push({sprite:U,speed:T,baseY:m,phase:w*1.31}),this.disposables.push(P)}),this.disposables.push(o);const c=Aa(),h=new tn({map:c,color:16720917,transparent:!0,opacity:0,depthWrite:!1,blending:he,fog:!1});this.ngPlusSkyGlow=new cn(h),this.ngPlusSkyGlow.position.set(-18,11.5,-34),this.ngPlusSkyGlow.scale.set(38,22,1),this.ngPlusSkyGlow.visible=!1,this.scene.add(this.ngPlusSkyGlow);const u=this.mobile?170:280,d=new Float32Array(u*3),f=new Float32Array(u*3);for(let p=0;p<u;p+=1){const m=p*3,y=Q.randFloat(-34,26),x=Q.randFloat(.6,21),M=Q.randFloat(-26,8);d[m]=f[m]=y,d[m+1]=f[m+1]=x,d[m+2]=f[m+2]=M}const g=new de;g.setAttribute("position",new ge(d,3));const _=new Gn({color:16733224,size:.13,transparent:!0,opacity:.88,depthWrite:!1,blending:he,fog:!1});this.ngPlusEmbers=new ri(g,_),this.ngPlusEmbers.visible=!1,this.scene.add(this.ngPlusEmbers),this.ngPlusEmberBase=f,this.disposables.push(c,h,g,_)}createLights(){this.scene.add(new b0(8228786,1182475,1.7));const t=new ms(11716851,3.25);this.moonLight=t,t.position.set(-18,24,13),t.castShadow=!0,t.shadow.mapSize.set(this.mobile?1024:2048,this.mobile?1024:2048),t.shadow.camera.left=-36,t.shadow.camera.right=36,t.shadow.camera.top=24,t.shadow.camera.bottom=-20,t.shadow.camera.near=1,t.shadow.camera.far=100,t.shadow.bias=-35e-5,this.scene.add(t);const e=new ms(7311830,1.2);this.rimLight=e,e.position.set(-12,7,12),this.scene.add(e);const n=new ms(9021418,.75);this.huskFillLight=n,n.position.set(14,8,18),this.scene.add(n),this.hellGlow=new en(16730128,35,24,1.8),this.hellGlow.position.set(15.5,4,0),this.scene.add(this.hellGlow),this.riftLight=new en(16726536,98,32,1.5),this.riftLight.position.set(-23,2.8,0),this.scene.add(this.riftLight),this.riftWalkLight=new en(16734744,38,19,1.75),this.riftWalkLight.position.set(-18.4,2.3,0),this.scene.add(this.riftWalkLight)}createGround(){const t=new Cs(104,80,72,40);t.rotateX(-Math.PI/2);const e=t.attributes.position;for(let o=0;o<e.count;o+=1){const l=e.getX(o),c=e.getZ(o);let h=Math.sin(l*.16)*.05+Math.cos(c*.5)*.035+Math.sin((l+c)*.12)*.025;l>-14&&l<12&&(h*=.25),e.setY(o,h)}t.computeVertexNormals();const n=new wt(t,this.materials.earth);n.position.set(0,-.05,8),n.receiveShadow=!0,this.scene.add(n),this.disposables.push(t);const i=new ai(18,48);i.rotateX(-Math.PI/2);const s=new ae({color:592139,transparent:!0,opacity:.12,depthWrite:!1,side:xe}),a=new wt(i,s);a.position.set(-2.5,.025,.8),a.scale.set(1.6,.55,1),this.scene.add(a),this.disposables.push(i,s)}createHellRift(){this.riftGroup=new se,this.riftGroup.position.set(-23,.025,0),this.scene.add(this.riftGroup),[[-.18,-5.2,.48,1.25],[.22,-3.7,.54,1.35],[-.14,-2.1,.46,1.3],[.28,-.55,.58,1.45],[-.22,1,.48,1.3],[.2,2.7,.52,1.42],[-.06,4.45,.44,1.25]].forEach(([h,u,d,f],g)=>{const _=new ai(1,28);_.rotateX(-Math.PI/2);const p=new wt(_,this.materials.crater);p.position.set(h,.008+g*5e-4,u),p.scale.set(d*1.7,f*1.15,1),this.riftGroup.add(p);const m=new ai(1,28);m.rotateX(-Math.PI/2);const y=new wt(m,this.materials.riftHot);y.position.set(h,.025+g*5e-4,u),y.scale.set(d,f,1),this.riftGroup.add(y),this.disposables.push(_,m)}),this.riftFlames=[],[-5,-3.2,-1.4,.5,2.5,4.5].forEach((h,u)=>{const d=new se;d.position.set(u%2?.2:-.16,.15,h),this.riftGroup.add(d);const f=new un(.34+u%3*.05,1.55+u%2*.45,9),g=new ae({color:16730893,transparent:!0,opacity:.72,blending:he,depthWrite:!1}),_=new wt(f,g);_.position.y=.72,d.add(_);const p=new un(.18,1.05,8),m=new ae({color:16760924,transparent:!0,opacity:.88,blending:he,depthWrite:!1}),y=new wt(p,m);y.position.y=.62,d.add(y);const x=new en(16729872,10,6,2);x.position.y=.8,d.add(x),this.riftFlames.push({group:d,outer:_,inner:y,light:x,phase:u*.83}),this.disposables.push(f,g,p,m)}),[[0,.8,2.2,.84],[-.45,-2.1,1.45,.55],[.28,3.2,1.35,.48]].forEach(([h,u,d,f],g)=>{const _=new ai(1.85,48);_.rotateX(-Math.PI/2);const p=new wt(_,this.materials.crater);p.position.set(h,.004+g*.001,u),p.scale.set(d*1.55,f*1.55,1),this.riftGroup.add(p),this.disposables.push(_);const m=new ai(1.42,48);m.rotateX(-Math.PI/2);const y=new wt(m,g===0?this.materials.riftHot:this.materials.rift);y.position.set(h,.02+g*.001,u),y.scale.set(d,f,1),this.riftGroup.add(y),this.disposables.push(m)}),[new A(0,.035,.8),new A(-.45,.035,-2.1),new A(.28,.035,3.2)].forEach((h,u)=>{const d=u===0?14:8;for(let f=0;f<d;f+=1){const g=f/d*Math.PI*2+Q.randFloatSpread(.34),_=Q.randFloat(1.8,u===0?5.8:3.7),p=new A(Math.cos(g),0,Math.sin(g)),m=h.clone().addScaledVector(p,_*.48).add(new A(Q.randFloatSpread(.35),0,Q.randFloatSpread(.35))),y=h.clone().addScaledVector(p,_).add(new A(Q.randFloatSpread(.45),0,Q.randFloatSpread(.45))),x=new _o([h.clone(),m,y]),M=new Rr(x,8,u===0?.06:.045,4,!1),C=new wt(M,f%4===0?this.materials.riftHot:this.materials.rift);this.riftGroup.add(C),this.disposables.push(M)}});const i=Aa();[[-.3,2.6,.7,5.2,7,.28],[.8,1.9,2.3,4,5.4,.18],[4.3,1.8,0,7.4,5.6,.13]].forEach(([h,u,d,f,g,_],p)=>{const m=new tn({map:i,color:p===0?16738845:16751189,transparent:!0,opacity:_,depthWrite:!1,blending:he,fog:!1}),y=new cn(m);y.position.set(h,u,d),y.scale.set(f,g,1),this.riftGroup.add(y),this.disposables.push(m)}),this.disposables.push(i);const s=this.mobile?110:170,a=new Float32Array(s*3),o=new Float32Array(s*3);for(let h=0;h<s;h+=1){const u=Q.randFloat(-3.4,8),d=Q.randFloat(.05,5.8),f=Q.randFloat(-5.8,5.8);a[h*3]=u,a[h*3+1]=d,a[h*3+2]=f,o[h*3]=u,o[h*3+1]=d,o[h*3+2]=f}const l=new de;l.setAttribute("position",new ge(a,3));const c=new Gn({color:16738846,size:.145,transparent:!0,opacity:.96,depthWrite:!1,blending:he});this.riftEmbers=new ri(l,c),this.riftEmbers.position.y=.03,this.riftGroup.add(this.riftEmbers),this.riftEmberBase=o,this.disposables.push(l,c)}createForest(){const t=new nn(.12,.28,8.5,6),e=new nn(.035,.075,2.4,5);this.disposables.push(t,e);for(let n=0;n<(this.mobile?27:34);n+=1){const i=new se;let s,a;do s=Q.randFloat(-32,-19.2),a=Q.randFloat(-12,12);while(s>-26&&s<-20.2&&Math.abs(a)<6.4);i.position.set(s,0,a),i.scale.setScalar(Q.randFloat(.78,1.48)),this.scene.add(i);const o=new wt(t,this.materials.forest);o.position.y=4.25,o.rotation.z=Q.randFloatSpread(.12),o.castShadow=!0,i.add(o);const l=2+Math.floor(Math.random()*4);for(let c=0;c<l;c+=1){const h=new wt(e,this.materials.forest);h.position.y=Q.randFloat(4,7.4),h.rotation.z=Q.randFloat(.75,1.2)*(Math.random()>.5?1:-1),h.rotation.y=Math.random()*Math.PI,h.castShadow=!0,i.add(h)}this.treeColliders.push({position:i.position.clone(),radius:.5*i.scale.x,height:8.5*i.scale.y})}}createGroundFog(){const t=Aa();[[-23,6.8,12.5,4.6,.14],[-17,3,11.8,4.2,.12],[-11,-1,12.8,4.4,.13],[-5,4.4,13.2,4.8,.11],[1,-2.1,13.8,4.8,.11],[8,2.7,12.4,4.4,.1],[15,-.8,12,4.2,.095],[21,3.4,11.2,4,.09],[4,6.6,14.5,4.6,.1]].forEach(([n,i,s,a,o],l)=>{if(this.mobile&&l%2===1)return;const c=new tn({map:t,color:l%2===0?12897492:14081508,transparent:!0,opacity:.12+l*.008,depthWrite:!1,depthTest:!0,fog:!0}),h=new cn(c);h.position.set(n,.7+l*.025,i),h.scale.set(s,a,1),h.renderOrder=4,this.scene.add(h),this.groundFog.push({mesh:h,speed:o,phase:l*1.7,baseZ:i,baseY:.7+l*.025,baseOpacity:.12+l*.008}),this.disposables.push(c)}),this.disposables.push(t)}loadManor(){const t=this.assets.createManorClone();oi.prepareModel(t),oi.fitModelToHeight(t,13.8,0);const e=new se;e.position.set(20.8,0,-1.1),e.add(t),this.scene.add(e),e.updateMatrixWorld(!0),this.manorHolder=e,this.manorBounds.setFromObject(e),this.manorBarrierX=this.manorBounds.min.x-.12,this.createBraziers(),this.createTurretMounts(),this.createUpgradeVisuals(),this.createManorDamageDust()}createBraziers(){for(const t of[-4.6,4.6]){const e=new se;e.position.set(this.manorBarrierX-1,0,t),this.scene.add(e);const n=new nn(.055,.075,.88,7);for(let M=0;M<3;M+=1){const C=new wt(n,this.materials.iron),T=M/3*Math.PI*2;C.position.set(Math.cos(T)*.2,.48,Math.sin(T)*.2),C.rotation.z=Math.cos(T)*.18,C.rotation.x=Math.sin(T)*.18,C.castShadow=!0,e.add(C)}const i=new nn(.38,.24,.2,12,1,!0),s=new wt(i,this.materials.iron);s.position.y=.96,s.castShadow=!0,e.add(s);const a=new Tr(.37,.045,6,14);a.rotateX(Math.PI/2);const o=new wt(a,this.materials.iron);o.position.y=1.07,e.add(o);const l=new nn(.25,.27,.08,10),c=new He({color:2822152,emissive:16723461,emissiveIntensity:2.3,roughness:.8}),h=new wt(l,c);h.position.y=1.08,e.add(h);const u=[];[[-.1,1.43,.04,.22,.72,16730897],[.1,1.36,-.04,.18,.58,16747310],[0,1.53,.01,.13,.46,16765034]].forEach(([M,C,T,w,P,U],v)=>{const b=new un(w,P,8),F=new ae({color:U,transparent:!0,opacity:v===0?.78:.92,blending:he,depthWrite:!1}),O=new wt(b,F);O.position.set(M,C,T),e.add(O),u.push({flame:O,phase:Math.random()*Math.PI*2}),this.disposables.push(b,F)});const f=12,g=new Float32Array(f*3),_=new Float32Array(f*3);for(let M=0;M<f;M+=1){const C=M*3,T=Q.randFloatSpread(.42),w=Q.randFloat(1.16,2.55),P=Q.randFloatSpread(.42);g[C]=_[C]=T,g[C+1]=_[C+1]=w,g[C+2]=_[C+2]=P}const p=new de;p.setAttribute("position",new ge(g,3));const m=new Gn({color:16747575,size:.08,transparent:!0,opacity:.88,depthWrite:!1,blending:he}),y=new ri(p,m);e.add(y);const x=new en(16733462,12,8,2);x.position.y=1.34,e.add(x),this.flames.push({flames:u,light:x,sparks:y,sparkBase:_,phase:Math.random()*Math.PI*2}),this.disposables.push(n,i,a,l,c,p,m)}}createManorDamageDust(){const t=N_();this.disposables.push(t),this.manorDustBursts=[];for(let e=0;e<12;e+=1){const n=new se;n.visible=!1,this.scene.add(n);const i=[];for(let s=0;s<5;s+=1){const a=new tn({map:t,color:s%2?12102296:9406336,transparent:!0,opacity:0,depthWrite:!1,depthTest:!0,fog:!0}),o=new cn(a);o.position.set(0,0,0),o.scale.set(.8,.55,1),n.add(o),i.push({sprite:o,material:a,offsetX:Q.randFloat(-.22,.18),offsetY:Q.randFloat(.05,.55),offsetZ:Q.randFloatSpread(.65),grow:Q.randFloat(.9,1.35)}),this.disposables.push(a)}this.manorDustBursts.push({group:n,puffs:i,timer:0,duration:.9,active:!1})}}triggerManorDamageDust(t,e="husk"){if(!t||this.manorDustBursts.length===0)return;const n=this.manorDustBursts.find(s=>!s.active)??this.manorDustBursts[0],i=e==="brute"||e==="siege";n.active=!0,n.timer=n.duration,n.group.visible=!0,n.group.position.set(this.manorBarrierX-.1,i?.95:.55,Q.clamp(t.z,this.manorBounds.min.z+.5,this.manorBounds.max.z-.5)),n.puffs.forEach(({sprite:s,material:a,offsetX:o,offsetY:l,offsetZ:c},h)=>{s.position.set(o,l,c);const u=(i?1.35:1)*(.72+h*.08);s.scale.set(u,u*.66,1),a.opacity=i?.62:.48})}createTurretMounts(){const t=Math.min(this.manorBounds.max.y*.31,4.2),e=[-4.35,-.15,4.05],n=[0,1.45,.45];for(let i=0;i<3;i+=1){const s=new se;s.position.set(this.manorBarrierX+.24,t+n[i],e[i]),s.rotation.y=-Math.PI/2,s.scale.setScalar(1.12),s.visible=!1,this.scene.add(s);const a=new se;s.add(a);const o=new Ye(.22,.28,1.2),l=new He({color:2233359,roughness:.82,metalness:.05}),c=new wt(o,l);c.position.set(0,-.26,.14),c.castShadow=!0,a.add(c);const h=new Ye(.1,.62,.52),u=new wt(h,this.materials.iron);u.position.set(0,-.12,.82),u.castShadow=!0,a.add(u);const d=new Ye(.2,.18,1.72),f=new He({color:2889488,roughness:.76,metalness:.06}),g=new wt(d,f);g.position.z=.1,g.castShadow=!0,a.add(g);const _=new Ye(.08,.08,1.95),p=new wt(_,this.materials.iron);p.position.set(0,.12,.02),p.castShadow=!0,a.add(p);const m=new _o([new A(-.9,.03,-.58),new A(-.42,.12,-.76),new A(0,.18,-.82),new A(.42,.12,-.76),new A(.9,.03,-.58)]),y=new Rr(m,18,.055,6,!1),x=new wt(y,this.materials.iron);x.castShadow=!0,a.add(x);const M=new de().setFromPoints([new A(-.9,.03,-.58),new A(0,.17,-.08),new A(.9,.03,-.58)]),C=new ko({color:13811890,transparent:!0,opacity:.8}),T=new Ir(M,C);a.add(T);const w=new un(.09,.34,6);for(const F of[-1,1]){const O=new wt(w,this.materials.iron);O.position.set(F*.92,.03,-.58),O.rotation.z=F*Math.PI/2,O.castShadow=!0,a.add(O)}const P=new As(.11,1),U=new wt(P,this.materials.ember);U.position.set(0,.14,-.52),a.add(U);const v=new en(16730899,6.5,4.5,2);v.position.copy(U.position),a.add(v);const b=new oe;b.position.set(0,.12,-1.02),a.add(b),this.turretMounts.push({group:s,pivot:a,muzzle:b,ember:U,light:v,phase:i*1.2}),this.disposables.push(o,l,h,d,f,_,y,M,C,w,P)}}createUpgradeVisuals(){const t=new se,e=Math.min(this.manorBounds.max.y*.58,7.45);t.position.set(this.manorBarrierX+.48,e,-.15),t.visible=!1,this.scene.add(t),this.extractionGroup=t,this.extractionCentre.copy(t.position);const n=D_(),i=new tn({map:n,color:16761470,transparent:!0,opacity:.94,blending:he,depthWrite:!1,depthTest:!0,fog:!1}),s=new cn(i);s.position.set(0,.15,0),s.scale.set(8.8,3.25,1),t.add(s);const a=new tn({map:n,color:16739108,transparent:!0,opacity:.18,blending:he,depthWrite:!1,depthTest:!0,fog:!1}),o=new cn(a);o.position.copy(s.position),o.scale.set(10.2,4.2,1),t.add(o);const l=new en(16752975,26,18,1.8);l.position.set(0,.6,0),t.add(l),this.extractionBeams=[];for(let V=0;V<$.extraction.maxConcurrent;V+=1){const X=new se,z=[-1.25,0,1.25];X.position.copy(this.extractionCentre.clone().add(new A(z[V]??0,0,0))),X.visible=!1,this.scene.add(X);const J=new nn(.48,2.25,13.5,28,1,!0),W=new ae({color:16773577,transparent:!0,opacity:0,blending:he,depthWrite:!1,side:xe}),at=new wt(J,W);at.position.y=6.55,X.add(at);const ot=new nn(.18,.92,14,20,1,!0),pt=new ae({color:16777215,transparent:!0,opacity:0,blending:he,depthWrite:!1,side:xe}),Bt=new wt(ot,pt);Bt.position.y=6.8,X.add(Bt);const Xt=20,q=new Float32Array(Xt*3);for(let At=0;At<Xt;At+=1){const kt=At*3,jt=Math.random()*Math.PI*2,Ht=Math.random()*1.3;q[kt]=Math.cos(jt)*Ht,q[kt+1]=Math.random()*10,q[kt+2]=Math.sin(jt)*Ht}const et=new de;et.setAttribute("position",new ge(q,3));const gt=new Gn({color:16769192,size:.13,transparent:!0,opacity:0,depthWrite:!1,blending:he}),ht=new ri(et,gt);X.add(ht);const Rt=new en(16766619,0,12,1.8);Rt.position.y=2.8,X.add(Rt),this.extractionBeams.push({group:X,beam:at,inner:Bt,particles:ht,light:Rt,timer:0,duration:$.extraction.duration,active:!1,phase:V*1.8}),this.disposables.push(J,W,ot,pt,et,gt)}this.upgradeGroups.extraction={group:t,portal:s,portalHalo:o,portalMaterial:i,portalHaloMaterial:a,portalTexture:n,light:l};const c=new se;c.position.set(this.manorBarrierX+.4,0,4.8),c.visible=!1,this.scene.add(c);const h=this.assets.createShedClone();oi.prepareModel(h),oi.fitModelToHeight(h,2.45,-Math.PI/2),c.add(h);const u=new en(16727590,9,5.5,2);u.position.set(0,1.15,0),c.add(u),this.upgradeGroups.demolition={group:c,shed:h,light:u};const d=new se;d.visible=!1,this.scene.add(d);const f=new Ye(.16,2.4,.16),g=new He({color:3942424,roughness:.9,emissive:7025936,emissiveIntensity:.25});[-4.1,-1.4,1.4,4.1].forEach((V,X)=>{const z=new wt(f,g);z.position.set(this.manorBarrierX+.25,1.2,V),z.rotation.z=X%2?-.18:.18,d.add(z)}),this.upgradeGroups.undercroft={group:d};const _=new se;_.position.set(this.manorBarrierX+3.7,Math.min(this.manorBounds.max.y+1.1,13.5),-.7),_.visible=!1,this.scene.add(_);const p=new As(.36,2),m=new ae({color:10183679,transparent:!0,opacity:.88,blending:he,depthWrite:!1}),y=new wt(p,m);_.add(y);const x=new Tr(.72,.035,7,40),M=m.clone();M.opacity=.58;const C=new wt(x,M);_.add(C);const T=new wt(x,M.clone());T.rotation.x=Math.PI/2,_.add(T),this.upgradeGroups.occult={group:_,orb:y,ringA:C,ringB:T},this.occultStrikes=[];for(let V=0;V<8;V+=1){const X=new se;X.visible=!1,this.scene.add(X);const z=[];for(let W=0;W<6;W+=1){const at=new un(.22+W%3*.05,.9+W%2*.45,8),ot=new ae({color:W%2?13936383:10247423,transparent:!0,opacity:0,blending:he,depthWrite:!1}),pt=new wt(at,ot),Bt=W/6*Math.PI*2;pt.position.set(Math.cos(Bt)*.42,.45,Math.sin(Bt)*.42),X.add(pt),z.push(pt),this.disposables.push(at,ot)}const J=new en(11627775,0,7,1.8);J.position.y=.9,X.add(J),this.occultStrikes.push({group:X,flames:z,light:J,timer:0,active:!1,phase:V*.9})}const w=new se,P=new un(.12,.75,6);[-4.7,-3,-1.3,1.3,3,4.7].forEach(V=>{const X=new wt(P,this.materials.iron);X.position.set(this.manorBarrierX-.45,.38,V),w.add(X)}),w.visible=!1,this.scene.add(w);const U=new se,v=new Ye(.18,.22,2.1);[-3.7,-1.2,1.2,3.7].forEach((V,X)=>{const z=new wt(v,this.materials.iron);z.position.set(this.manorBarrierX+.05,1.6+X%2*.5,V),z.rotation.x=X%2?.12:-.12,U.add(z)}),U.visible=!1,this.scene.add(U);const b=new se,F=new Ps(.45,.54,24),O=new ae({color:16742962,transparent:!0,opacity:.5,blending:he,depthWrite:!1,side:xe});[-2.6,0,2.6].forEach(V=>{const X=new wt(F,O);X.position.set(this.manorBarrierX-.02,2.8,V),X.rotation.y=Math.PI/2,b.add(X)}),b.visible=!1,this.scene.add(b),this.fortifyGroups=[w,U,b],this.disposables.push(n,i,a,f,g,p,m,x,M,T.material,P,v,F,O)}setUpgradeState({extraction:t=!1,extractionLevel:e=0,demolition:n=!1,undercroft:i=!1,occult:s=!1,fortifyLevel:a=0}={}){this.extractionCapacity=t?Q.clamp(e||1,1,$.extraction.maxLevel):0,this.upgradeGroups.extraction&&(this.upgradeGroups.extraction.group.visible=t),t||this.extractionBeams.forEach(o=>{o.active=!1,o.timer=0,o.group.visible=!1}),this.upgradeGroups.demolition&&(this.upgradeGroups.demolition.group.visible=n),this.upgradeGroups.undercroft&&(this.upgradeGroups.undercroft.group.visible=i),this.upgradeGroups.occult&&(this.upgradeGroups.occult.group.visible=s),this.fortifyGroups.forEach((o,l)=>{o.visible=a>=[1,4,8][l]})}isInsideExtractionZone(t){return this.extractionGroup?.visible?t.x>=this.manorBarrierX-1.5&&t.x<=this.manorBounds.max.x+1.2&&t.y>=this.manorBounds.max.y*.3&&t.y<=this.manorBounds.max.y+5.5:!1}getAvailableExtractionSlot(t=this.extractionCapacity){const e=Q.clamp(t||1,1,$.extraction.maxLevel);return this.extractionBeams.slice(0,e).findIndex(n=>!n.active)}startExtractionBeam(t=this.extractionCapacity){if(!this.extractionGroup?.visible)return-1;const e=this.getAvailableExtractionSlot(t);if(e<0)return-1;const n=this.extractionBeams[e];return n.active=!0,n.timer=n.duration,n.group.visible=!0,n.beam.material.opacity=.02,n.inner.material.opacity=.02,n.particles.material.opacity=.02,n.light.intensity=5,e}getActiveExtractionCount(){return this.extractionBeams.reduce((t,e)=>t+(e.active?1:0),0)}consumeExtractionCompletions(){const t=this.extractionCompletions;return this.extractionCompletions=0,t}triggerOccultStrike(t){const e=this.occultStrikes.find(n=>!n.active)??this.occultStrikes[0];e&&(e.active=!0,e.timer=1.05,e.group.visible=!0,e.group.position.copy(t).setY(.04),e.flames.forEach((n,i)=>{n.material.opacity=.72,n.scale.setScalar(.75+i*.05)}),e.light.intensity=15)}pulseOccultEffect(){this.occultPulseTimer=.65}setTurretLevel(t){this.turretMounts.forEach((e,n)=>{e.group.visible=n<t})}getTurretOrigin(t){const e=this.turretMounts[t];if(!e)return new A(this.manorBarrierX,4.5,0);const n=new A;return e.muzzle.getWorldPosition(n),n}aimTurret(t,e){const n=this.turretMounts[t];if(!n||!e)return;const i=e.clone();n.group.worldToLocal(i);const s=Math.atan2(i.x,-i.z),a=Math.hypot(i.x,i.z),o=-Math.atan2(i.y,Math.max(a,.001));n.pivot.rotation.y=Q.clamp(s,-.42,.42),n.pivot.rotation.x=Q.clamp(o,-.25,.28)}setNewGamePlusMode(t){if(this.newGamePlus=!!t,this.ngPlusEmbers&&(this.ngPlusEmbers.visible=this.newGamePlus&&!this.dawnActive),this.ngPlusSkyGlow&&(this.ngPlusSkyGlow.visible=this.newGamePlus&&!this.dawnActive,this.ngPlusSkyGlow.material.opacity=this.newGamePlus?.42:0),this.riftGroup&&!this.dawnActive&&!this.victoryClosing){const e=this.newGamePlus?1.34:1;this.riftGroup.scale.set(e,1,e)}this.resetNight()}startVictorySequence(){this.victoryClosing||this.dawnActive||(this.victoryClosing=!0,this.victoryTimer=0,this.victoryDawnStarted=!1)}prepareDawnAssets(){if(!this.dawnSun){const t=document.createElement("canvas");t.width=192,t.height=192;const e=t.getContext("2d"),n=e.createRadialGradient(96,96,18,96,96,92);n.addColorStop(0,"rgba(255,246,196,1)"),n.addColorStop(.48,"rgba(255,196,119,.96)"),n.addColorStop(.72,"rgba(255,145,87,.42)"),n.addColorStop(1,"rgba(255,124,72,0)"),e.fillStyle=n,e.fillRect(0,0,192,192);const i=new qn(t);i.colorSpace=fe;const s=new tn({map:i,transparent:!0,opacity:0,depthWrite:!1,fog:!1});this.dawnSun=new cn(s),this.dawnSun.position.set(-8.5,1,-35),this.dawnSun.scale.set(7.4,7.4,1),this.dawnSun.visible=!1,this.scene.add(this.dawnSun),this.disposables.push(i,s)}this.dawnLight||(this.dawnLight=new ms(16765082,0),this.dawnLight.position.set(-14,16,12),this.dawnLight.visible=!1,this.scene.add(this.dawnLight)),this.createDawnBirds(),this.dawnBirds.forEach(t=>{t.sprite.visible=!1,t.sprite.material.opacity=0})}setDawnPrewarmVisible(t){this.prepareDawnAssets(),this.dawnSun&&(this.dawnSun.visible=t,this.dawnSun.material.opacity=t?.85:0,this.dawnSun.position.set(-8.5,8,-35)),this.dawnLight&&(this.dawnLight.visible=t,this.dawnLight.intensity=t?2.2:0),this.dawnBirds.forEach((e,n)=>{e.sprite.visible=t,e.sprite.material.opacity=t?.62:0,e.sprite.position.set(-19+n*4.5,12.5+n%2,-29+n*.5)})}resetTransientEffects(){this.extractionBeams.forEach(t=>{t.active=!1,t.timer=0,t.group.visible=!1,t.beam.material.opacity=0,t.inner.material.opacity=0,t.particles.material.opacity=0,t.light.intensity=0}),this.occultStrikes.forEach(t=>{t.active=!1,t.timer=0,t.group.visible=!1,t.light.intensity=0,t.flames.forEach(e=>{e.material.opacity=0})}),this.manorDustBursts?.forEach(t=>{t.active=!1,t.timer=0,t.group.visible=!1,t.puffs.forEach(({material:e})=>{e.opacity=0})}),this.setDawnPrewarmVisible(!1),this.extractionCompletions=0}createDawnBirds(){if(this.dawnBirds.length>0){this.dawnBirds.forEach(i=>{i.sprite.visible=!0,i.progress=-i.delay});return}const t=document.createElement("canvas");t.width=96,t.height=48;const e=t.getContext("2d");e.clearRect(0,0,96,48),e.strokeStyle="rgba(25,23,22,.88)",e.lineWidth=5,e.lineCap="round",e.beginPath(),e.moveTo(8,28),e.quadraticCurveTo(24,12,45,26),e.moveTo(45,26),e.quadraticCurveTo(66,10,88,27),e.stroke();const n=new qn(t);n.colorSpace=fe;for(let i=0;i<5;i+=1){const s=new tn({map:n,transparent:!0,opacity:0,depthWrite:!1,fog:!1}),a=new cn(s);a.scale.set(1.15+i*.12,.56+i*.05,1),a.position.set(-28-i*2,13+i%3*1.1,-29+i*.5),this.scene.add(a),this.dawnBirds.push({sprite:a,delay:1.6+i*.85,progress:-(1.6+i*.85),baseY:a.position.y}),this.disposables.push(s)}this.disposables.push(n)}resetNight(){if(this.victoryClosing=!1,this.victoryTimer=0,this.victoryDawnStarted=!1,this.dawnActive=!1,this.dawnProgress=0,this.scene.background.set(this.newGamePlus?1180679:329225),this.scene.fog?.color&&(this.scene.fog.color.set(this.newGamePlus?1508873:526605),this.scene.fog.density=this.newGamePlus?.02:.018),this.riftGroup){this.riftGroup.visible=!0;const t=this.newGamePlus?1.34:1;this.riftGroup.scale.set(t,1,t)}this.materials.rift.opacity=.86,this.materials.riftHot.opacity=.96,this.riftEmbers?.material&&(this.riftEmbers.material.opacity=.96),this.riftFlames?.forEach(({outer:t,inner:e,light:n})=>{t.material.opacity=.72,e.material.opacity=.88,t.visible=!0,e.visible=!0,n.intensity=10}),this.ngPlusEmbers&&(this.ngPlusEmbers.visible=this.newGamePlus),this.ngPlusSkyGlow&&(this.ngPlusSkyGlow.visible=this.newGamePlus,this.ngPlusSkyGlow.material.opacity=this.newGamePlus?.42:0),this.moon?.material&&(this.moon.material.opacity=.78),this.stars?.material&&(this.stars.material.opacity=.86),this.moonLight&&(this.moonLight.intensity=3.25),this.rimLight&&(this.rimLight.intensity=1.2),this.huskFillLight&&(this.huskFillLight.intensity=.75),this.riftLight&&(this.riftLight.intensity=this.newGamePlus?155:92),this.riftWalkLight&&(this.riftWalkLight.intensity=this.newGamePlus?74:38),this.hellGlow&&(this.hellGlow.intensity=this.newGamePlus?48:33),this.flames.forEach(({flames:t,light:e,sparks:n})=>{t?.forEach(({flame:i})=>{i.visible=!0}),n&&(n.visible=!0),e&&(e.intensity=12)}),this.dawnBirds.forEach(t=>{t.sprite.visible=!1,t.sprite.material.opacity=0}),this.prepareDawnAssets(),this.dawnSun&&(this.dawnSun.visible=!1,this.dawnSun.material.opacity=0,this.dawnSun.position.set(-8.5,1,-35)),this.dawnLight&&(this.dawnLight.visible=!1,this.dawnLight.intensity=0)}startDawn(){this.dawnActive||(this.dawnActive=!0,this.dawnProgress=0,this.turretMounts.forEach(t=>{t.group.visible=!1}),Object.values(this.upgradeGroups).forEach(t=>{t?.group&&(t.group.visible=!1)}),this.fortifyGroups.forEach(t=>{t.visible=!1}),this.extractionBeams.forEach(t=>{t.active=!1,t.group.visible=!1}),this.occultStrikes.forEach(t=>{t.active=!1,t.group.visible=!1}),this.riftGroup&&(this.riftGroup.visible=!1),this.riftLight&&(this.riftLight.intensity=0),this.riftWalkLight&&(this.riftWalkLight.intensity=0),this.ngPlusEmbers&&(this.ngPlusEmbers.visible=!1),this.ngPlusSkyGlow&&(this.ngPlusSkyGlow.visible=!1),this.flames.forEach(({flames:t,light:e,sparks:n})=>{t?.forEach(({flame:i})=>{i.visible=!1}),n&&(n.visible=!1),e&&(e.intensity=0)}),this.prepareDawnAssets(),this.dawnSun.visible=!0,this.dawnSun.material.opacity=0,this.dawnSun.position.set(-8.5,1,-35),this.dawnLight.visible=!0,this.dawnLight.intensity=0,this.createDawnBirds())}isInsideManorCollision(t){return t.x>=this.manorBarrierX&&t.y<=this.manorBounds.max.y+1&&t.z>=this.manorBounds.min.z-.8&&t.z<=this.manorBounds.max.z+.8}findTreeCollision(t){for(const e of this.treeColliders){if(t.y>e.height)continue;const n=t.x-e.position.x,i=t.z-e.position.z;if(n*n+i*i<=e.radius*e.radius)return e}return null}update(t,e=0){if(this.victoryClosing&&!this.dawnActive){this.victoryTimer+=e;const n=Q.clamp(this.victoryTimer/4.2,0,1),i=1-n;if(this.riftGroup){const s=this.newGamePlus?1.34:1;this.riftGroup.scale.set(s*Q.lerp(1,.55,n),Q.lerp(1,.72,n),s*Q.lerp(1,.12,n))}this.materials.rift.opacity=.86*i,this.materials.riftHot.opacity=.96*i,this.riftEmbers?.material&&(this.riftEmbers.material.opacity=.96*i),this.riftLight&&(this.riftLight.intensity=(this.newGamePlus?155:92)*i),this.riftWalkLight&&(this.riftWalkLight.intensity=(this.newGamePlus?74:38)*i),this.riftFlames?.forEach(({outer:s,inner:a,light:o})=>{s.material.opacity=.72*i,a.material.opacity=.88*i,o.intensity=10*i}),this.victoryTimer>=2.4&&(this.turretMounts.forEach(s=>{s.group.visible=!1}),Object.values(this.upgradeGroups).forEach(s=>{s?.group&&(s.group.visible=!1)}),this.fortifyGroups.forEach(s=>{s.visible=!1})),n>=1&&!this.victoryDawnStarted&&(this.victoryDawnStarted=!0,this.victoryClosing=!1,this.startDawn())}if(this.dawnActive){this.dawnProgress=Math.min(1,this.dawnProgress+e/15);const n=this.dawnProgress,i=n*n*(3-2*n),s=new yt(this.newGamePlus?1180679:329225),a=new yt(9349044);if(this.scene.background.copy(s).lerp(a,i),this.scene.fog?.color){const o=new yt(this.newGamePlus?1508873:526605);this.scene.fog.color.copy(o.lerp(new yt(10856352),i)),this.scene.fog.density=Q.lerp(this.newGamePlus?.02:.018,.0075,i)}this.dawnSun&&(this.dawnSun.position.y=Q.lerp(1,14.5,i),this.dawnSun.material.opacity=Math.min(1,i*1.35)),this.dawnLight&&(this.dawnLight.intensity=i*3.2),this.moon?.material&&(this.moon.material.opacity=.78*(1-i)),this.stars?.material&&(this.stars.material.opacity=.86*(1-i)),this.moonLight&&(this.moonLight.intensity=3.25*(1-i*.78)),this.rimLight&&(this.rimLight.intensity=1.2*(1-i*.55)),this.huskFillLight&&(this.huskFillLight.intensity=.75*(1-i))}if(this.dawnActive||this.flames.forEach(({flames:n,light:i,sparks:s,sparkBase:a,phase:o})=>{const l=.9+Math.sin(t*8+o)*.12+Math.sin(t*15+o)*.04;if(n.forEach(({flame:c,phase:h},u)=>{const d=l+Math.sin(t*(10+u*2)+h)*.08;c.scale.set(.88+d*.12,.92+d*.28,.88+d*.12),c.rotation.y=Math.sin(t*3+h)*.22}),i.intensity=9.5+l*3.4,s&&a){const c=s.geometry.attributes.position,h=c.array;for(let u=0;u<c.count;u+=1){const d=u*3;h[d]=a[d]+Math.sin(t*2.2+u)*.05,h[d+1]=1.12+(a[d+1]-1.12+t*(.22+u%4*.035))%1.55,h[d+2]=a[d+2]+Math.cos(t*1.8+u)*.05}c.needsUpdate=!0}}),this.turretMounts.forEach(({ember:n,light:i,phase:s})=>{const a=1+Math.sin(t*5+s)*.12;n.scale.setScalar(a),i.intensity=4.2+a*1.5}),this.skyClouds.forEach(({sprite:n,speed:i,baseY:s,phase:a})=>{n.position.x+=i*e,n.position.y=s+Math.sin(t*.12+a)*.16,n.position.x>34&&(n.position.x=-34)}),this.groundFog.forEach(({mesh:n,speed:i,phase:s,baseZ:a,baseY:o,baseOpacity:l})=>{n.position.x+=i*e,n.position.z=a+Math.sin(t*.17+s)*.38,n.position.y=o+Math.sin(t*.33+s)*.08;const c=this.dawnActive?1-this.dawnProgress*.74:1;I_(n.material,t,s,l*c),n.position.x>30&&(n.position.x=-30)}),this.riftEmbers&&this.riftEmberBase){const n=this.riftEmbers.geometry.attributes.position,i=n.array,s=n.count;for(let a=0;a<s;a+=1){const o=a*3,l=this.riftEmberBase[o+1],c=(t*(.45+a%7*.04)+l)%6;i[o]=this.riftEmberBase[o]+Math.sin(t*1.8+a)*.08,i[o+1]=c,i[o+2]=this.riftEmberBase[o+2]+Math.cos(t*1.3+a*.7)*.08}n.needsUpdate=!0}if(this.ngPlusEmbers?.visible&&this.ngPlusEmberBase){const n=this.ngPlusEmbers.geometry.attributes.position,i=n.array;for(let s=0;s<n.count;s+=1){const a=s*3,o=this.ngPlusEmberBase[a+1];i[a]=this.ngPlusEmberBase[a]+Math.sin(t*.55+s*.37)*.34,i[a+1]=.6+(o-.6+t*(.34+s%9*.025))%21,i[a+2]=this.ngPlusEmberBase[a+2]+Math.cos(t*.42+s)*.24}n.needsUpdate=!0,this.ngPlusSkyGlow&&(this.ngPlusSkyGlow.material.opacity=.38+Math.sin(t*.55)*.06)}if(this.dawnActive&&this.dawnBirds.length>0&&this.dawnBirds.forEach((n,i)=>{n.progress+=e*(.085+i*.006);const s=n.progress;s<0||(n.sprite.visible=s<=1.15,n.sprite.material.opacity=Math.min(.78,Math.max(0,s*2.6))*Math.max(0,1-Math.max(0,s-.92)*5),n.sprite.position.x=Q.lerp(-28,31,Math.min(1,s)),n.sprite.position.y=n.baseY+Math.sin(t*2.1+i)*.24)}),this.upgradeGroups.extraction?.group.visible){const n=this.upgradeGroups.extraction,i=1+Math.sin(t*2.8)*.08;n.portal.material.opacity=.44+Math.sin(t*2.4)*.07,n.portalHalo.material.opacity=.14+Math.sin(t*1.9+1.1)*.04;const s=1+Math.sin(t*2)*.025;n.portal.scale.set(8.8*s,3.25*s,1),n.portalHalo.scale.set(10.2/s,4.2/s,1),n.light.intensity=20+i*7}if(this.extractionBeams.forEach((n,i)=>{if(!n.active)return;n.timer-=e;const s=Q.clamp(1-n.timer/n.duration,0,1),a=Math.sin(Math.min(1,s*3.2)*Math.PI*.5)*Math.sin(Math.min(1,(1-s)*5)*Math.PI*.5),o=.92+Math.sin(t*8+n.phase)*.08;n.beam.material.opacity=.52*a*o,n.inner.material.opacity=.76*a,n.particles.material.opacity=.96*a,n.light.intensity=72*a,n.beam.scale.set(1+Math.sin(t*3+i)*.04,1,1+Math.cos(t*2.4+i)*.04);const l=n.particles.geometry.attributes.position,c=l.array;for(let h=0;h<l.count;h+=1){const u=h*3+1;c[u]=(c[u]+e*(1.1+h%5*.16))%10.5}l.needsUpdate=!0,n.timer<=0&&(n.active=!1,n.group.visible=!1,this.extractionCompletions+=1)}),this.manorDustBursts.forEach(n=>{if(!n.active)return;n.timer-=e;const i=Q.clamp(1-n.timer/n.duration,0,1),s=Math.max(0,1-i);n.puffs.forEach(({sprite:a,material:o,grow:l},c)=>{a.position.x-=e*(.28+c*.025),a.position.y+=e*(.32+c*.035);const u=.72+c*.08+i*l;a.scale.set(u,u*.66,1),o.opacity=s*(c%2?.34:.46)}),n.timer<=0&&(n.active=!1,n.group.visible=!1)}),this.upgradeGroups.demolition?.group.visible&&(this.upgradeGroups.demolition.light.intensity=7.5+Math.sin(t*4.2)*1.8),this.occultStrikes.forEach(n=>{if(!n.active)return;n.timer-=e;const i=Q.clamp(1-n.timer/1.05,0,1),s=Math.sin(Math.min(1,i*2.2)*Math.PI*.5)*(1-i);n.flames.forEach((a,o)=>{const l=.9+Math.sin(t*(10+o)+n.phase)*.15;a.scale.set(.8*l,1.1+l*.45,.8*l),a.material.opacity=.9*s}),n.light.intensity=20*s,n.timer<=0&&(n.active=!1,n.group.visible=!1)}),this.upgradeGroups.occult?.group.visible){const n=this.upgradeGroups.occult;n.ringA.rotation.x+=e*.5,n.ringA.rotation.y+=e*.3,n.ringB.rotation.y-=e*.6;const i=this.occultPulseTimer>0?1.7:1;n.orb.scale.setScalar((.92+Math.sin(t*4.2)*.12)*i)}if(this.occultPulseTimer=Math.max(0,this.occultPulseTimer-e),!this.dawnActive&&!this.victoryClosing&&this.riftFlames?.forEach(({group:n,outer:i,inner:s,light:a,phase:o})=>{const l=.92+Math.sin(t*7.5+o)*.16+Math.sin(t*13+o)*.05;n.position.x+=Math.sin(t*1.6+o)*e*.015,i.scale.set(.9/l,1.15*l,.9/l),s.scale.set(.94/l,1.08*l,.94/l),a.intensity=8.5+l*4.5}),!this.dawnActive&&!this.victoryClosing){const n=this.newGamePlus?155:92,i=this.newGamePlus?74:38;this.riftLight.intensity=n+Math.sin(t*4.2)*(this.newGamePlus?24:14),this.riftWalkLight&&(this.riftWalkLight.intensity=i+Math.sin(t*2.7+.6)*(this.newGamePlus?10:5)),this.hellGlow.intensity=(this.newGamePlus?48:33)+Math.sin(t*2.1)*2}else this.dawnActive&&(this.riftLight.intensity=0,this.riftWalkLight&&(this.riftWalkLight.intensity=0),this.hellGlow.intensity=Math.max(0,(this.newGamePlus?48:33)*(1-this.dawnProgress)))}dispose(){this.disposables.forEach(t=>t.dispose?.())}}class F_{constructor({camera:t,domElement:e,getEnemies:n,onRelease:i,onDirectClick:s}){this.camera=t,this.domElement=e,this.getEnemies=n,this.onRelease=i,this.onDirectClick=s,this.raycaster=new V0,this.pointer=new ft,this.previousPointer=new ft,this.dragPlane=new Bn,this.planeHit=new A,this.target=new A,this.initialGrabPosition=new A,this.heldEnemy=null,this.springVelocity=new A,this.pointerHistory=[],this.maxHistoryAge=.15,this.depthDrift=0,this.enabled=!1,this.onPointerDown=this.onPointerDown.bind(this),this.onPointerMove=this.onPointerMove.bind(this),this.onPointerUp=this.onPointerUp.bind(this),window.addEventListener("pointerdown",this.onPointerDown),window.addEventListener("pointermove",this.onPointerMove),window.addEventListener("pointerup",this.onPointerUp),window.addEventListener("pointercancel",this.onPointerUp)}setEnabled(t){this.enabled=t,t||this.forceRelease()}setPointer(t){const e=this.domElement.getBoundingClientRect();this.previousPointer.copy(this.pointer),this.pointer.x=(t.clientX-e.left)/e.width*2-1,this.pointer.y=-((t.clientY-e.top)/e.height)*2+1}onPointerDown(t){if(!this.enabled||t.button!==0)return;const e=this.getEnemies().filter(a=>!a.dead&&!a.removed&&(a.isPickable?.()||a.canDirectClick?.()));this.setPointer(t),this.raycaster.setFromCamera(this.pointer,this.camera);const n=this.raycaster.intersectObjects(e.map(a=>a.group),!0);if(!n.length)return;const i=n[0].object.userData.enemy;if(!i||i.dead||i.removed)return;if(i.canDirectClick?.()){t.preventDefault(),this.onDirectClick?.(i);return}if(!i.isPickable?.()||!i.beginGrab())return;this.heldEnemy=i,this.initialGrabPosition.copy(i.position),this.springVelocity.copy(i.velocity),i.velocity.set(0,0,0),this.depthDrift=0;const s=new A;this.camera.getWorldDirection(s),this.dragPlane.setFromNormalAndCoplanarPoint(s,i.position),this.updateTargetFromPointer(),this.pointerHistory.length=0,this.recordHistory(),document.body.classList.add("grabbing")}onPointerMove(t){if(this.setPointer(t),!this.heldEnemy)return;const e=this.pointer.x-this.previousPointer.x;this.depthDrift=Q.clamp(this.depthDrift+e*6,-4.2,4.2),this.updateTargetFromPointer(),this.recordHistory()}updateTargetFromPointer(){this.raycaster.setFromCamera(this.pointer,this.camera),this.raycaster.ray.intersectPlane(this.dragPlane,this.planeHit)&&(this.target.copy(this.planeHit),this.target.x=Q.clamp(this.target.x,-23,17.5),this.target.y=Q.clamp(this.target.y,.04,15),this.target.z=Q.clamp(this.initialGrabPosition.z+this.depthDrift+this.planeHit.z*.15,-6.5,6.5))}recordHistory(){const t=performance.now()/1e3;for(this.pointerHistory.push({time:t,position:this.target.clone()});this.pointerHistory.length>2&&t-this.pointerHistory[0].time>this.maxHistoryAge;)this.pointerHistory.shift()}update(t){if(!this.heldEnemy)return;const n=92*(this.heldEnemy.type==="brute"?.63:1),i=this.heldEnemy.type==="brute"?13:10.8,s=this.target.clone().sub(this.heldEnemy.position);this.springVelocity.addScaledVector(s,n*t),this.springVelocity.multiplyScalar(Math.exp(-i*t)),this.heldEnemy.position.addScaledVector(this.springVelocity,t),this.heldEnemy.updatePeakHeight(),this.heldEnemy.group.rotation.z=Q.lerp(this.heldEnemy.group.rotation.z,-this.springVelocity.x*.048,.18),this.heldEnemy.group.rotation.x=Q.lerp(this.heldEnemy.group.rotation.x,this.springVelocity.z*.045,.18),this.recordHistory()}calculateReleaseVelocity(){if(this.pointerHistory.length<2)return this.springVelocity.clone();const t=this.pointerHistory[0],e=this.pointerHistory[this.pointerHistory.length-1],n=Math.max(e.time-t.time,.016),s=e.position.clone().sub(t.position).divideScalar(n).multiplyScalar(1.05).addScaledVector(this.springVelocity,.58);return s.y<0&&(s.y*=1.38),s.z*=1.15,s.clampLength(0,40)}onPointerUp(){if(!this.heldEnemy)return;const t=this.heldEnemy,e=this.calculateReleaseVelocity();this.heldEnemy=null,this.pointerHistory.length=0,this.springVelocity.set(0,0,0),document.body.classList.remove("grabbing"),this.onRelease?.({enemy:t,velocity:e.clone(),position:t.position.clone()})!==!0&&t.launch(e)}forceRelease(){this.heldEnemy=null,this.pointerHistory.length=0,this.springVelocity.set(0,0,0),document.body.classList.remove("grabbing")}isHolding(t){return this.heldEnemy===t}dispose(){window.removeEventListener("pointerdown",this.onPointerDown),window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerUp)}}function Li(r,t){return r.find(e=>t.test(e.name))}class O_{constructor({id:t,type:e="husk",scene:n,assets:i,camera:s,position:a,onDeath:o,onAttack:l,onImpact:c,onSiegeClick:h,onExtractionComplete:u}){this.scene=n,this.assets=i,this.camera=s,this.onDeath=o,this.onAttack=l,this.onImpact=c,this.onSiegeClick=h,this.onExtractionComplete=u,this.group=new se,this.scene.add(this.group),this.modelRoot=new se,this.group.add(this.modelRoot),this.velocity=new A,this.mixer=null,this.actions={},this.currentAction=null,this.grabCollider=null,this.model=null,this.animations=[],this.type=e,this.definition=$.enemyTypes[e],this.loadModel(),this.resetForSpawn(t,a,e)}get position(){return this.group.position}loadModel(){const t=this.assets.createEnemyClone(this.type),e=t.scene;oi.prepareModel(e),oi.fitModelToHeight(e,this.definition.height,this.definition.rotationY),e.traverse(l=>{if(l.isMesh&&(l.userData.enemy=this,(this.type==="strong"||this.type==="siege")&&l.material)){const c=h=>{const u=h.clone();return u.color&&u.color.multiply(this.type==="siege"?new yt(.1,.12,.16):new yt(.72,.42,.34)),"emissive"in u&&(u.emissive=new yt(this.type==="siege"?329746:3478024),u.emissiveIntensity=this.type==="siege"?.06:.45),u};l.material=Array.isArray(l.material)?l.material.map(c):c(l.material)}}),this.modelRoot.add(e),this.model=e,this.animations=t.animations;const[n,i,s]=this.definition.grabBox,a=new Ye(n,i,s),o=new ae({transparent:!0,opacity:0,depthWrite:!1,depthTest:!1,color:16777215});if(this.grabCollider=new wt(a,o),this.grabCollider.position.set(0,this.definition.grabY,0),this.grabCollider.userData.enemy=this,this.modelRoot.add(this.grabCollider),this.animations.length>0){this.mixer=new z0(e);const l={walk:Li(this.animations,/walk|run|crawl|move|locomotion/i)??this.animations[0],flail:Li(this.animations,/flail|grab|struggle|air/i),fall:Li(this.animations,/fall|knock|hit|stumble|trip/i),getUp:Li(this.animations,/get.?up|stand|recover/i),attack:Li(this.animations,/attack|strike|bite|swipe/i),idle:Li(this.animations,/idle/i)};for(const[c,h]of Object.entries(l))h&&(this.actions[c]=this.mixer.clipAction(h))}this.markPickable()}markPickable(){this.group.traverse(t=>{t.isMesh&&(t.userData.enemy=this)})}setTypeRuntime(t){this.type=t,this.definition=$.enemyTypes[t];const[e,n]=this.definition.speed;this.walkSpeed=Q.randFloat(e,n),this.walkAnimationSpeed=Q.randFloat(this.definition.animationSpeed[0],this.definition.animationSpeed[1]),this.soulValue=this.definition.reward,this.attackDamage=this.definition.attackDamage,this.attackInterval=this.definition.attackInterval,this.durability=this.definition.durability,this.maxDurability=this.definition.durability,this.convertible=this.definition.convertible,this.gravity=this.type==="brute"?31:28}playAction(t,e=.12,n=!0){const i=this.actions[t];if(i){if(i===this.currentAction){i.paused=!1;return}this.currentAction&&this.currentAction.fadeOut(e),i.reset(),i.enabled=!0,i.setLoop(n?Gc:kc,n?1/0:1),i.clampWhenFinished=!n,i.fadeIn(e).play(),this.currentAction=i}}isPickable(){return!this.dead&&!this.removed&&this.type!=="siege"&&(this.state==="walking"||this.state==="attacking")}canDirectClick(){return this.type==="siege"&&!this.dead&&!this.removed&&(this.state==="walking"||this.state==="siegeCharging"||this.state==="attacking")}directClick(){return this.canDirectClick()?(this.onSiegeClick?.(this),!0):!1}beginGrab(){return this.isPickable()?(this.state="grabbed",this.velocity.set(0,0,0),this.peakScreenY=this.getScreenY(),this.peakWorldY=this.position.y,this.playAction(this.actions.flail?"flail":"walk",.1),this.currentAction&&(this.currentAction.timeScale=1.25),!0):!1}launch(t){if(this.dead||this.removed||this.state==="extracting")return;const e=this.type==="brute"?29:42;this.velocity.copy(t).multiplyScalar(1.12*this.definition.throwScale).clampLength(0,e),this.state="airborne",this.peakScreenY=Math.min(this.peakScreenY,this.getScreenY()),this.peakWorldY=Math.max(this.peakWorldY,this.position.y),this.currentAction&&(this.currentAction.paused=!0)}getScreenY(){return 1-(this.position.clone().project(this.camera).y+1)*.5}updatePeakHeight(){this.peakScreenY=Math.min(this.peakScreenY,this.getScreenY()),this.peakWorldY=Math.max(this.peakWorldY,this.position.y)}getGroundDropFraction(){return Math.max(0,this.getScreenY()-this.peakScreenY)}stumble(t=.85,e=null){this.dead||this.removed||(this.position.y=0,this.state="fallen",this.fallTimer=t,this.attackTimer=0,this.velocity.copy(e??new A).multiplyScalar(.15),this.playAction(this.actions.fall?"fall":"idle",.08,!1),this.actions.fall||(this.group.rotation.z=Q.randFloat(.8,1.18)*(Math.random()>.5?1:-1)))}knockDown(t=null){this.stumble(this.type==="brute"?1:.72,t)}applyDamage(t=1,e="impact",n=10){return this.dead||this.removed||this.state==="extracting"?!1:this.type==="siege"?(this.durability-=t,this.durability<=0?(this.onDeath?.({enemy:this,reason:e,position:this.position.clone().add(new A(0,this.definition.height*.28,0)),impactStrength:n}),!0):(this.state="siegeStunned",this.siegeStunTimer=1.15,this.siegeResumeCharging=this.position.x>=(this.lastManorBarrierX??13)-(this.definition.siegeStopOffset??0)-.2,this.velocity.set(0,0,0),this.currentAction&&(this.currentAction.paused=!0),!1)):(this.durability-=t,this.durability<=0?(this.onDeath?.({enemy:this,reason:e,position:this.position.clone().add(new A(0,this.definition.height*.3,0)),impactStrength:n}),!0):(this.stumble(this.type==="brute"?1.05:.86),!1))}hitHardSurface(t,e){this.dead||this.removed||(this.onImpact?.({enemy:this,reason:t,impactStrength:e}),this.applyDamage(1,t,e))}beginExtraction(t,e=0){return!this.convertible||this.dead||this.removed?!1:(this.state="extracting",this.extractionTimer=t,this.extractionDuration=t,this.velocity.set(0,0,0),this.extractionBase.copy(this.position),this.extractionBase.z+=e,this.position.copy(this.extractionBase),this.playAction(this.actions.idle?"idle":"walk",.1),this.currentAction&&(this.currentAction.timeScale=.4),!0)}staggerSiege(t=1){return this.type!=="siege"||this.dead||this.removed||this.state==="siegeStunned"?!1:(this.applyDamage(t,"siege-stagger",12),!0)}reachManor(t){if(!(this.dead||this.removed||this.state==="attacking")){if(this.type==="siege"){this.state="siegeCharging",this.velocity.set(0,0,0),this.attackTimer=2.6,this.playAction(this.actions.attack?"attack":"walk",.15);return}this.position.x=t,this.state="attacking",this.velocity.set(0,0,0),this.attackTimer=.35,this.playAction(this.actions.attack?"attack":"walk",.15)}}update(t,e,n,i=13){if(this.dead||this.removed)return;if(this.lastManorBarrierX=i,this.collisionCooldown=Math.max(0,this.collisionCooldown-t),this.mixer?.update(t),this.state==="extracting"){this.extractionTimer-=t;const a=Q.clamp(1-this.extractionTimer/this.extractionDuration,0,1);this.position.x=this.extractionBase.x,this.position.z=this.extractionBase.z+Math.sin(e*1.8+this.id)*.08,this.position.y=this.extractionBase.y+a*3.2+Math.sin(e*6)*.08,this.modelRoot.rotation.y+=t*(.5+a*1.2),this.modelRoot.scale.setScalar(Math.max(.08,1-Math.max(0,a-.74)/.26)),this.extractionTimer<=0&&this.onExtractionComplete?.(this);return}if(n){this.state!=="grabbed"&&this.beginGrab(),this.updatePeakHeight(),this.actions.flail||(this.modelRoot.rotation.z=Math.sin(e*12)*.08);return}if(this.modelRoot.rotation.z=Q.lerp(this.modelRoot.rotation.z,0,.16),this.state==="grabbed"&&(this.state="airborne"),this.state==="airborne"){if(this.updatePeakHeight(),this.velocity.y-=this.gravity*t,this.velocity.multiplyScalar(Math.pow(.992,t*60)),this.group.position.addScaledVector(this.velocity,t),this.group.rotation.z-=this.velocity.x*t*.12,this.group.rotation.x+=this.velocity.z*t*.12,this.position.y<=0){this.position.y=0;const a=Math.sqrt(Math.max(0,-this.velocity.y)**2+(this.velocity.x*.22)**2+(this.velocity.z*.22)**2);if(this.onImpact?.({enemy:this,reason:"ground",impactStrength:a}),this.getGroundDropFraction()>=$.enemy.groundDeathScreenFraction){this.applyDamage(1,"ground",a);return}this.stumble(this.type==="brute"?1.05:.72),this.velocity.set(0,0,0)}return}if(this.state==="fallen"){this.fallTimer-=t,this.fallTimer<=0&&(this.state="gettingUp",this.getUpTimer=this.actions.getUp?.95:.68,this.playAction(this.actions.getUp?"getUp":"idle",.1,!1));return}if(this.state==="gettingUp"){this.getUpTimer-=t,this.group.rotation.x=Q.lerp(this.group.rotation.x,0,.14),this.group.rotation.y=Q.lerp(this.group.rotation.y,0,.14),this.group.rotation.z=Q.lerp(this.group.rotation.z,0,.14),this.getUpTimer<=0&&(this.group.rotation.set(0,0,0),this.modelRoot.scale.set(1,1,1),this.state="walking",this.playAction("walk",.12),this.actions.walk&&(this.actions.walk.timeScale=this.walkAnimationSpeed));return}if(this.state==="siegeStunned"){this.siegeStunTimer-=t;const a=Math.sin(e*34+this.id)*.035;this.modelRoot.position.x=a,this.modelRoot.position.z=Math.cos(e*29+this.id)*.025,this.siegeStunTimer<=0&&(this.modelRoot.position.set(0,0,0),this.state=this.siegeResumeCharging?"siegeCharging":"walking",this.currentAction&&(this.currentAction.paused=!1),this.state==="siegeCharging"?(this.attackTimer=Math.max(this.attackTimer,2.2),this.playAction(this.actions.attack?"attack":"walk",.12)):(this.playAction("walk",.12),this.actions.walk&&(this.actions.walk.timeScale=this.walkAnimationSpeed)));return}if(this.state==="attacking"){this.attackTimer-=t,this.attackTimer<=0&&(this.attackTimer=this.attackInterval,this.onAttack?.(this));return}if(this.state==="siegeCharging"){this.attackTimer-=t;const a=1+Math.sin(e*7.5)*.025;this.modelRoot.scale.set(a,1,a),this.attackTimer<=0&&(this.onAttack?.(this),this.attackTimer=this.attackInterval);return}this.state="walking",this.position.x+=this.walkSpeed*t;const s=i-(this.definition.siegeStopOffset??0);if(this.type==="siege"&&this.position.x>=s){this.position.x=s,this.reachManor(i);return}this.playAction("walk",.12),this.actions.walk&&(this.actions.walk.timeScale=this.walkAnimationSpeed)}resetForSpawn(t,e,n=this.type){if(n!==this.type)throw new Error("Pooled enemy type mismatch");this.setTypeRuntime(n),this.id=t,this.dead=!1,this.removed=!1,this.group.visible=!0,this.group.position.copy(e),this.group.rotation.set(0,0,0),this.modelRoot.rotation.set(0,0,0),this.modelRoot.position.set(0,0,0),this.modelRoot.scale.set(1,1,1),this.velocity.set(0,0,0),this.state="walking",this.attackTimer=0,this.fallTimer=0,this.getUpTimer=0,this.extractionTimer=0,this.extractionDuration=0,this.siegeStunTimer=0,this.siegeResumeCharging=!1,this.modelRoot.position.set(0,0,0),this.extractionBase=this.extractionBase??new A,this.collisionCooldown=0,this.peakScreenY=1,this.peakWorldY=0,this.mixer?.stopAllAction(),this.currentAction=null,this.playAction("walk",0),this.actions.walk&&(this.actions.walk.timeScale=this.walkAnimationSpeed)}deactivateForPool(){this.dead=!1,this.removed=!0,this.state="pooled",this.velocity.set(0,0,0),this.group.visible=!1,this.group.rotation.set(0,0,0),this.modelRoot.rotation.set(0,0,0),this.modelRoot.position.set(0,0,0),this.modelRoot.scale.set(1,1,1),this.mixer?.stopAllAction(),this.currentAction=null}preWarmAllActions(t=1/30){if(!this.mixer)return;const e=Object.keys(this.actions);for(const n of e){const i=/walk|idle|flail/.test(n);this.playAction(n,0,i),this.currentAction&&(this.currentAction.timeScale=n==="walk"?this.walkAnimationSpeed:1),this.mixer.update(t)}this.playAction("walk",0),this.actions.walk&&(this.actions.walk.timeScale=this.walkAnimationSpeed)}kill(){this.dead||(this.dead=!0,this.state="dead",this.group.visible=!1,this.mixer?.stopAllAction())}dispose(){this.removed=!0,this.mixer?.stopAllAction(),this.grabCollider&&(this.grabCollider.geometry.dispose(),this.grabCollider.material.dispose()),this.scene.remove(this.group)}}const ds=["husk","strong","runner","brute","siege"];class B_{constructor({scene:t,assets:e,camera:n,onEnemyDeath:i,onEnemyAttack:s,onEnemyImpact:a,onEnemyExtracted:o,onWaveComplete:l,onSiegeClick:c}){this.scene=t,this.assets=e,this.camera=n,this.onEnemyDeath=i,this.onEnemyAttack=s,this.onEnemyImpact=a,this.onEnemyExtracted=o,this.onWaveComplete=l,this.onSiegeClick=c,this.waveIndex=-1,this.config=null,this.enemies=[],this.queue=[],this.spawned=0,this.resolved=0,this.spawnTimer=0,this.running=!1,this.nextEnemyId=1,this.pools=Object.fromEntries(ds.map(h=>[h,[]])),this.pooledEnemies=new Set,this.activeExtractions=new Set,this.newGamePlus=!1}setNewGamePlus(t){this.newGamePlus=!!t}getWaveConfig(t){const e=$.waves[t];if(!this.newGamePlus)return e;const n=t+1,i=$.newGamePlus,s=Math.max(12,Math.ceil(e.total*i.waveCountMultiplier));let a=0,o=0,l=0,c=0;n>=i.runnerWave&&(a=Math.max(3,Math.round(s*Math.min(.3,.08+(n-i.runnerWave)*.0065)))),n>=i.strongWave&&(o=Math.max(3,Math.round(s*Math.min(.26,.07+(n-i.strongWave)*.006)))),n>=i.bruteWave&&(l=Math.max(2,Math.round(s*Math.min(.14,.04+(n-i.bruteWave)*.0032)))),n>=i.siegeWave&&(c=Math.max(1,Math.round(s*Math.min(.045,.01+(n-i.siegeWave)*.0015))));const h=Math.max(8,s-a-o-l-c);return{...e,counts:{husk:h,strong:o,runner:a,brute:l,siege:c},total:s,maxActive:i.maxActive,initialDelay:Math.max(1,e.initialDelay*.72),spawnGap:Math.max(.46,e.spawnGap*.84),burstChance:Math.min(.94,e.burstChance+.1),burstMax:Math.min(9,e.burstMax+1),huskPaceVariation:!0}}async preparePools(t=null){const e=$.pool,n=[];for(const i of ds)for(let s=0;s<e[i];s+=1)n.push(i);for(let i=0;i<n.length;i+=1){const s=n[i],a=this.createEnemy({id:-(i+1),type:s,position:new A(-45,0,0)});a.preWarmAllActions(),a.deactivateForPool(),this.pools[s].push(a),this.pooledEnemies.add(a),t?.((i+1)/n.length),i%2===1&&await new Promise(o=>requestAnimationFrame(o))}}createEnemy({id:t,type:e,position:n}){return new O_({id:t,type:e,scene:this.scene,assets:this.assets,camera:this.camera,position:n,onDeath:i=>this.handleEnemyDeath(i),onAttack:i=>this.onEnemyAttack?.(i),onImpact:i=>this.onEnemyImpact?.(i),onSiegeClick:i=>this.onSiegeClick?.(i),onExtractionComplete:i=>this.finishExtraction(i)})}getWarmupSamples(){return ds.map(t=>this.pools[t][0]).filter(Boolean)}getAllPooledEnemies(){return Object.values(this.pools).flat()}acquireEnemy(t,e,n){const s=this.pools[t].pop()??this.createEnemy({id:e,type:t,position:n});return this.pooledEnemies.delete(s),s.resetForSpawn(e,n,t),s}releaseEnemy(t){!t||this.pooledEnemies.has(t)||(this.activeExtractions.delete(t),t.deactivateForPool(),this.pools[t.type].push(t),this.pooledEnemies.add(t))}makeQueue(t){const e=[];for(const n of ds)for(let i=0;i<(t[n]??0);i+=1)e.push(n);for(let n=e.length-1;n>0;n-=1){const i=Math.floor(Math.random()*(n+1));[e[n],e[i]]=[e[i],e[n]]}if((t.husk??0)>0){const n=e.indexOf("husk");n>0&&([e[0],e[n]]=[e[n],e[0]])}return e}startWave(t){this.clearActiveOnly(),this.waveIndex=t,this.config=this.getWaveConfig(t),this.queue=this.makeQueue(this.config.counts),this.spawned=0,this.resolved=0,this.spawnTimer=this.config.initialDelay,this.running=!0}update(t){if(!(!this.running||!this.config)){if(this.enemies=this.enemies.filter(e=>!e.removed),this.spawned<this.queue.length&&(this.spawnTimer-=t,this.spawnTimer<=0)){const e=Math.max(0,this.config.maxActive-this.getActiveCombatEnemies().length);if(e>0){let n=1;Math.random()<this.config.burstChance&&(n=Q.randInt(2,this.config.burstMax)),n=Math.min(n,e,this.queue.length-this.spawned);for(let s=0;s<n;s+=1)this.spawnEnemy(s,n);const i=Q.randFloat(.78,1.22);this.spawnTimer=this.config.spawnGap*i}else this.spawnTimer=.2}this.spawned>=this.queue.length&&this.resolved>=this.queue.length&&this.getActiveCombatEnemies().length===0&&(this.running=!1,this.onWaveComplete?.(this.waveIndex))}}spawnEnemy(t=0,e=1){const n=[-4.3,-3.1,-1.9,-.7,.7,1.9,3.1,4.3],i=n[Math.floor(Math.random()*n.length)],s=this.queue[this.spawned]??"husk",a=Q.clamp(i+Q.randFloatSpread(.3)+(t-(e-1)/2)*.18,-5.3,5.3),o=this.acquireEnemy(s,this.nextEnemyId++,new A(Q.randFloat($.enemy.spawnXMin,$.enemy.spawnXMax)-t*.35,0,a));if(s==="husk"&&this.config.huskPaceVariation){const l=Math.random(),c=l<.24?.78:l>.72?1.18:1;o.walkSpeed*=c,o.walkAnimationSpeed*=Q.lerp(.88,1.12,(c-.78)/.4),o.actions.walk&&(o.actions.walk.timeScale=o.walkAnimationSpeed)}this.newGamePlus&&(o.walkSpeed*=$.newGamePlus.enemySpeedMultiplier,o.attackDamage=Math.ceil(o.attackDamage*$.newGamePlus.enemyAttackMultiplier),o.attackInterval*=$.newGamePlus.enemyAttackIntervalMultiplier,o.walkAnimationSpeed*=1.08,o.actions.walk&&(o.actions.walk.timeScale=o.walkAnimationSpeed)),this.enemies.push(o),this.spawned+=1}handleEnemyDeath(t){const e=t.enemy;!e||e.dead||e.removed||(e.kill(),this.resolved+=1,this.onEnemyDeath?.(t),window.setTimeout(()=>this.releaseEnemy(e),80))}captureEnemy(t){return!t||t.dead||t.removed||!t.convertible?!1:(t.kill(),this.activeExtractions.delete(t),this.resolved+=1,window.setTimeout(()=>this.releaseEnemy(t),70),!0)}startExtraction(t,e,n=0){return!t||t.dead||t.removed||!t.convertible||this.activeExtractions.has(t)||!t.beginExtraction(e,n)?!1:(this.activeExtractions.add(t),this.resolved+=1,!0)}finishExtraction(t){this.activeExtractions.has(t)&&(this.activeExtractions.delete(t),this.onEnemyExtracted?.(t),this.releaseEnemy(t))}getAliveEnemies(){return this.enemies.filter(t=>!t.dead&&!t.removed)}getActiveCombatEnemies(){return this.enemies.filter(t=>!t.dead&&!t.removed&&t.state!=="extracting")}getExtractionCount(){return this.activeExtractions.size}stop(){this.running=!1}clearActiveOnly(){this.enemies.forEach(t=>this.releaseEnemy(t)),this.enemies=[],this.activeExtractions.clear(),this.running=!1}clear(){this.clearActiveOnly()}dispose(){this.clearActiveOnly();for(const t of ds)this.pools[t].forEach(e=>e.dispose()),this.pools[t]=[];this.pooledEnemies.clear()}}const k_=new A(0,0,1);class G_{constructor(t,e,n,i,s,a,o){this.scene=t,this.world=e,this.getEnemies=n,this.onDamageEnemy=i,this.isEnemyHeld=s??(()=>!1),this.onFire=a,this.onOccultPulse=o,this.hellfireSouls=0,this.occultSouls=0,this.mountTimers=[1.2,2.2,3.2],this.occultTimer=12,this.projectiles=[],this.impacts=[],this.arrowPool=[],this.impactPool=[],this.createPools()}createPools(){for(let t=0;t<18;t+=1)this.arrowPool.push(this.createArrow());for(let t=0;t<14;t+=1)this.impactPool.push(this.createImpactObject())}createArrow(){const t=new se;t.visible=!1,this.scene.add(t);const e=new nn(.035,.045,1.24,7);e.rotateX(Math.PI/2);const n=new He({color:3875864,roughness:.78,metalness:.08}),i=new wt(e,n);t.add(i);const s=new un(.1,.3,7);s.rotateX(Math.PI/2);const a=new He({color:4802123,roughness:.42,metalness:.8}),o=new wt(s,a);o.position.z=.74,t.add(o);const l=new Dr(.17,9,7),c=new ae({color:16747317,transparent:!0,opacity:.94,blending:he,depthWrite:!1}),h=new wt(l,c);h.position.z=-.24,t.add(h);const u=new un(.13,.55,8);u.rotateX(-Math.PI/2);const d=new ae({color:16732949,transparent:!0,opacity:.78,blending:he,depthWrite:!1}),f=new wt(u,d);return f.position.z=-.56,t.add(f),{group:t,shaftGeometry:e,shaftMaterial:n,headGeometry:s,headMaterial:a,fireGeometry:l,fireMaterial:c,flameGeometry:u,flameMaterial:d,fire:h,flame:f,active:!1,target:null,destination:new A,fallback:new A,age:0,speed:16}}createImpactObject(){const t=new Ps(.22,.44,20),e=new ae({color:16738845,transparent:!0,opacity:0,blending:he,depthWrite:!1,side:xe}),n=new wt(t,e);return n.rotation.x=-Math.PI/2,n.visible=!1,this.scene.add(n),{mesh:n,geometry:t,material:e,active:!1,age:0}}setHellfireSouls(t){this.hellfireSouls=Math.max(0,t),this.world.setTurretLevel(this.getMountCount()),this.resetCooldown()}setOccultSouls(t){this.occultSouls=Math.max(0,t),this.occultTimer=Math.min(this.occultTimer,this.getOccultInterval())}getMountCount(){const t=Math.min(this.hellfireSouls,$.defence.hellfireMaxSouls);return t<=0?0:t<10?1:t<25?2:3}getFireInterval(){const t=Math.min(this.hellfireSouls,$.defence.hellfireMaxSouls);if(t<=0)return 1/0;if(t<10){const n=Q.clamp((t-1)/8,0,1);return Q.lerp(7,3.8,n)}if(t<25){const n=Q.clamp((t-10)/14,0,1);return Q.lerp(7,3.6,n)}const e=Q.clamp((t-25)/20,0,1);return Q.lerp(7,2.4,e)}getOccultInterval(){const t=Math.min(this.occultSouls,$.defence.occultMaxSouls);return t<=0?1/0:Q.lerp(13.5,6,Q.clamp((t-1)/29,0,1))}update(t,e){if(this.updateProjectiles(t),this.updateImpacts(t),!e)return;const n=this.getMountCount();if(n>0)for(let i=0;i<n;i+=1)this.mountTimers[i]-=t,this.mountTimers[i]<=0&&(this.fireMount(i),this.mountTimers[i]+=this.getFireInterval());this.occultSouls>0&&(this.occultTimer-=t,this.occultTimer<=0&&(this.fireOccultPulse(),this.occultTimer=this.getOccultInterval()))}chooseTarget(){return this.getEnemies().filter(t=>!t.dead&&!t.removed&&t.state!=="extracting"&&!this.isEnemyHeld(t)).sort((t,e)=>e.position.x-t.position.x)[0]??null}chooseGroundPoint(t,e=null){return e?new A(e.position.x,.08,e.position.z):new A(Q.randFloat(-12,7),.08,Q.clamp((t-1)*1.8+Q.randFloatSpread(5),-5.2,5.2))}fireMount(t){const e=this.chooseTarget(),n=this.chooseGroundPoint(t,e),i=e?e.position.clone().add(new A(0,Math.min(e.definition.height*.4,2.1),0)):n.clone();this.world.aimTurret(t,i),this.fireProjectile(t,e,i,n),this.onFire?.({mountIndex:t,target:e})}acquireArrow(){const t=this.arrowPool.find(e=>!e.active)??this.arrowPool[0];return t.active=!0,t.group.visible=!0,t.group.scale.setScalar(1),t}fireProjectile(t,e,n,i){const s=this.acquireArrow();s.group.position.copy(this.world.getTurretOrigin(t)),s.target=e,s.destination.copy(n),s.fallback.copy(i),s.age=0,this.projectiles.push(s)}releaseArrow(t){t.active=!1,t.target=null,t.group.visible=!1;const e=this.projectiles.indexOf(t);e>=0&&this.projectiles.splice(e,1)}updateProjectiles(t){for(let e=this.projectiles.length-1;e>=0;e-=1){const n=this.projectiles[e];n.age+=t,n.target&&!n.target.dead&&!n.target.removed&&n.target.state!=="extracting"&&!this.isEnemyHeld(n.target)?n.destination.copy(n.target.position).add(new A(0,Math.min(n.target.definition.height*.4,2.1),0)):n.target&&(n.destination.copy(n.fallback),n.target=null);const i=n.destination.clone().sub(n.group.position),s=i.length();if(s<=.32||n.age>4.6){const o=n.target,l=n.destination.clone();this.releaseArrow(n),this.createImpact(l),o&&!o.dead&&!o.removed&&!this.isEnemyHeld(o)&&this.onDamageEnemy?.(o,"turret",1);continue}i.normalize(),n.group.quaternion.setFromUnitVectors(k_,i),n.group.position.addScaledVector(i,Math.min(s,n.speed*t));const a=.92+Math.sin(n.age*24)*.15;n.fire.scale.setScalar(.95+a*.12),n.flame.scale.set(.96+a*.12,.96+a*.12,1+a*.14)}}createImpact(t){const e=this.impactPool.find(n=>!n.active)??this.impactPool[0];e.active=!0,e.age=0,e.mesh.visible=!0,e.mesh.position.copy(t).setY(.08),e.mesh.scale.setScalar(1),e.material.opacity=.76,this.impacts.includes(e)||this.impacts.push(e)}updateImpacts(t){for(let e=this.impacts.length-1;e>=0;e-=1){const n=this.impacts[e];n.age+=t;const i=Math.min(n.age/.5,1);n.mesh.scale.setScalar(1+i*6.2),n.material.opacity=(1-i)*.76,i>=1&&(n.active=!1,n.mesh.visible=!1,this.impacts.splice(e,1))}}fireOccultPulse(){const t=this.getEnemies().filter(i=>!i.dead&&!i.removed&&i.state!=="extracting");if(t.length===0)return;for(let i=t.length-1;i>0;i-=1){const s=Math.floor(Math.random()*(i+1));[t[i],t[s]]=[t[s],t[i]]}const e=this.occultSouls>=20?3:this.occultSouls>=10?2:1,n=t.slice(0,Math.min(e,t.length));this.world.pulseOccultEffect?.(),n.forEach(i=>{this.world.triggerOccultStrike?.(i.position.clone()),this.onDamageEnemy?.(i,"occult",1)}),this.onOccultPulse?.(n.length)}preWarm(){this.world.setTurretLevel(3),this.fireProjectile(0,null,new A(-2,.1,0),new A(-2,.1,0)),this.createImpact(new A(-3,.1,0)),this.updateProjectiles(1/30),this.updateImpacts(1/30)}resetCooldown(){this.mountTimers=[1.2,1.2+$.defence.fireStagger,1.2+$.defence.fireStagger*2]}clearForDawn(){this.hellfireSouls=0,this.occultSouls=0,this.projectiles.slice().forEach(t=>this.releaseArrow(t)),this.impacts.slice().forEach(t=>{t.active=!1,t.mesh.visible=!1}),this.impacts=[]}dispose(){this.arrowPool.forEach(t=>{this.scene.remove(t.group),t.shaftGeometry.dispose(),t.shaftMaterial.dispose(),t.headGeometry.dispose(),t.headMaterial.dispose(),t.fireGeometry.dispose(),t.fireMaterial.dispose(),t.flameGeometry.dispose(),t.flameMaterial.dispose()}),this.impactPool.forEach(t=>{this.scene.remove(t.mesh),t.geometry.dispose(),t.material.dispose()})}}const k={panel:"rgba(7,8,11,.95)",panel2:"rgba(14,14,18,.97)",border:"rgba(255,112,49,.72)",borderHot:"rgba(255,153,91,.94)",borderSoft:"rgba(255,102,38,.25)",orange:"#ff6a28",orangeLight:"#ffc39e",text:"#f4ebe3",muted:"#aaa19d",red:"#ef514e",purple:"#b58cff",amber:"#f0b56b"};class H_{constructor(t,e){this.canvas=t,this.ctx=t.getContext("2d"),this.callbacks=e,this.mode="loading",this.wave=1,this.waveTotal=$.waves.length,this.souls=0,this.health=$.manor.startHealth,this.maxHealth=$.manor.maxHealth,this.deaths=0,this.boundSouls=0,this.unassignedSouls=0,this.bombs=0,this.fortifyLevel=0,this.extractionLevel=0,this.buildings={},this.assignments={},this.purchaseCosts={},this.unlockWaves={},this.hasSave=!1,this.bannerTitle="",this.bannerSubtitle="",this.bannerTimer=0,this.healthFlash=0,this.soulPulse=0,this.boundPulse=0,this.soulFlights=[],this.buttons=[],this.shopPage=0,this.saveNoticeTimer=0,this.saveNoticeSuccess=!0,this.waveResults={souls:0,deaths:0,damage:0,health:this.health,maxHealth:this.maxHealth,saved:!1},this.tutorial=null,this.developerMode=!1,this.developerWave=1,this.developerShop=!1,this.developerPanelOpen=!1,this.canRetry=!0,this.continuesRemaining=3,this.ngPlusUnlocked=!1,this.bestRank=null,this.newGamePlus=!1,this.endingData=null,this.endingElapsed=0,this.touchDevice=window.matchMedia?.("(pointer: coarse)")?.matches||navigator.maxTouchPoints>0,this.shopScroll=0,this.shopScrollMax=0,this.shopViewport=null,this.activeButtonClip=null,this.pointerGesture=null,this.tutorialDemonImage=new Image,this.tutorialDemonImage.decoding="async",this.tutorialDemonImage.src="./assets/demon-image.png",this.tutorialDemonReady=!1,this.studioLogoImage=new Image,this.studioLogoImage.decoding="async",this.studioLogoImage.src="./assets/moofstudiogame.png",this.studioLogoReady=!1,this.onPointerDown=this.onPointerDown.bind(this),this.onPointerMove=this.onPointerMove.bind(this),this.onPointerUp=this.onPointerUp.bind(this),this.onWheel=this.onWheel.bind(this),this.resize=this.resize.bind(this),window.addEventListener("pointerdown",this.onPointerDown,!0),window.addEventListener("pointermove",this.onPointerMove,!0),window.addEventListener("pointerup",this.onPointerUp,!0),window.addEventListener("pointercancel",this.onPointerUp,!0),window.addEventListener("wheel",this.onWheel,{passive:!1,capture:!0}),window.addEventListener("resize",this.resize),this.resize()}resize(){const t=this.isMobileLandscape()?1.35:2,e=Math.min(window.devicePixelRatio||1,t);this.canvas.width=Math.floor(window.innerWidth*e),this.canvas.height=Math.floor(window.innerHeight*e),this.canvas.style.width=`${window.innerWidth}px`,this.canvas.style.height=`${window.innerHeight}px`,this.ctx.setTransform(e,0,0,e,0,0),this.shopScroll=Math.min(this.shopScroll,this.shopScrollMax)}isMobileLandscape(){return!!this.touchDevice&&window.innerWidth>window.innerHeight&&window.innerHeight<=700}async preloadImageAsset(t,e){try{if(t.complete&&t.naturalWidth>0||await new Promise((n,i)=>{const s=()=>{o(),n()},a=()=>{o(),i(new Error(`${e} failed to load`))},o=()=>{t.removeEventListener("load",s),t.removeEventListener("error",a)};t.addEventListener("load",s,{once:!0}),t.addEventListener("error",a,{once:!0})}),await t.decode?.().catch(()=>{}),!(t.naturalWidth>0&&t.naturalHeight>0))throw new Error(`${e} has no usable image data`);return!0}catch(n){throw n.assetFilename=e,n}}async preloadVisualAssets(){return await this.preloadImageAsset(this.tutorialDemonImage,"demon-image.png"),this.tutorialDemonReady=!0,await this.preloadImageAsset(this.studioLogoImage,"moofstudiogame.png"),this.studioLogoReady=!0,!0}setMode(t){this.mode=t,t==="intermission"&&(this.shopPage=0,this.shopScroll=0)}setHUD(t){Object.assign(this,t)}setHasSave(t){this.hasSave=t}setMeta(t={}){this.ngPlusUnlocked=!!t.ngPlusUnlocked,this.bestRank=t.bestRank??null}startEndingSequence(t){this.endingData=t,this.endingElapsed=0,this.mode="ending"}setDeveloperMode(t,e=1,n=!1){this.developerMode=!!t,this.developerWave=Math.max(1,Math.floor(Number(e)||1)),this.developerShop=!!n}setDeveloperPanel(t,e=this.developerWave){this.developerPanelOpen=!!t,this.developerWave=Math.max(1,Math.floor(Number(e)||1))}setContinueState({canRetry:t=!0,remaining:e=3}={}){this.canRetry=!!t,this.continuesRemaining=Math.max(0,Math.floor(Number(e)||0))}showExtractionTutorial(){this.tutorial={title:"SOUL EXTRACTION",lines:["GRAB A DEMON AND DROP IT INTO THE GLOWING PORTAL","ABOVE THE MANOR TO CREATE A BOUND SOUL.","WAIT FOR A BINDING SLOT TO BECOME FREE BEFORE DROPPING ANOTHER."]}}setWaveResults(t){this.waveResults={...this.waveResults,...t}}showSaveNotice(t=!0){this.saveNoticeSuccess=t,this.saveNoticeTimer=2.6}showBanner(t,e="",n=2.2){this.bannerTitle=t,this.bannerSubtitle=e,this.bannerTimer=n}flashHealth(){this.healthFlash=.5}pulseSouls(){this.soulPulse=.55}pulseBound(){this.boundPulse=.55}addSoulFlight(t,e,n=null,i=1){this.soulFlights.push({x:t,y:e,age:0,duration:.72+Math.random()*.16,onArrive:n,scale:i})}findButtonAt(t,e){for(let n=this.buttons.length-1;n>=0;n-=1){const i=this.buttons[n];if(t>=i.x&&t<=i.x+i.w&&e>=i.y&&e<=i.y+i.h)return i}return null}activateButton(t){t&&(this.callbacks.onUIClick?.(),t.disabled?t.onDenied?.():t.onClick?.())}pointInShopViewport(t,e){const n=this.shopViewport;return!!n&&t>=n.x&&t<=n.x+n.w&&e>=n.y&&e<=n.y+n.h}onPointerDown(t){const e=t.clientX,n=t.clientY,i=this.findButtonAt(e,n);if(this.isMobileLandscape()&&this.mode==="intermission"&&this.pointInShopViewport(e,n)){t.preventDefault(),t.stopImmediatePropagation(),this.pointerGesture={pointerId:t.pointerId,startY:n,lastY:n,moved:!1,pendingButton:i};return}i&&(t.preventDefault(),t.stopImmediatePropagation(),this.activateButton(i))}onPointerMove(t){const e=this.pointerGesture;if(!e||e.pointerId!==t.pointerId)return;const n=t.clientY-e.lastY;Math.abs(t.clientY-e.startY)>7&&(e.moved=!0),e.moved&&this.shopScrollMax>0&&(this.shopScroll=Math.max(0,Math.min(this.shopScrollMax,this.shopScroll-n)),e.lastY=t.clientY,t.preventDefault(),t.stopImmediatePropagation())}onPointerUp(t){const e=this.pointerGesture;!e||e.pointerId!==t.pointerId||(t.preventDefault(),t.stopImmediatePropagation(),!e.moved&&e.pendingButton&&this.activateButton(e.pendingButton),this.pointerGesture=null)}onWheel(t){this.mode!=="intermission"||!this.pointInShopViewport(t.clientX,t.clientY)||this.shopScrollMax<=0||(this.shopScroll=Math.max(0,Math.min(this.shopScrollMax,this.shopScroll+t.deltaY)),t.preventDefault(),t.stopImmediatePropagation())}update(t){this.mode==="ending"&&(this.endingElapsed+=t),this.bannerTimer=Math.max(0,this.bannerTimer-t),this.healthFlash=Math.max(0,this.healthFlash-t),this.soulPulse=Math.max(0,this.soulPulse-t),this.boundPulse=Math.max(0,this.boundPulse-t),this.saveNoticeTimer=Math.max(0,this.saveNoticeTimer-t);for(let e=this.soulFlights.length-1;e>=0;e-=1){const n=this.soulFlights[e];n.age+=t,n.age>=n.duration&&(this.soulFlights.splice(e,1),this.pulseSouls(),n.onArrive?.())}}draw(){const t=this.ctx,e=window.innerWidth,n=window.innerHeight;t.clearRect(0,0,e,n),this.buttons=[],this.mode==="start"?this.drawStart(e,n):this.mode==="playing"?(this.drawHUD(e,n),this.drawPauseButton(e,n),this.bannerTimer>0&&this.drawBanner(e,n)):this.mode==="paused"?(this.drawHUD(e,n),this.drawPaused(e,n)):this.mode==="results"?(this.drawHUD(e,n),this.drawResults(e,n)):this.mode==="intermission"?(this.drawHUD(e,n),this.drawIntermission(e,n),this.tutorial&&this.drawTutorial(e,n)):this.mode==="gameOver"?(this.drawHUD(e,n),this.drawGameOver(e,n)):this.mode==="ending"?this.drawEnding(e,n):this.mode==="complete"&&this.drawComplete(e,n),this.developerPanelOpen&&this.drawDeveloperPanel(e,n)}font(t){return`${t}px "Lansbury", Georgia, serif`}dataFont(t,e=700){return`${Math.max(e,760)} ${t}px "Arial Narrow","Roboto Condensed","Segoe UI",Arial,sans-serif`}angularPath(t,e,n,i,s=10){const a=this.ctx,o=Math.min(s,n*.14,i*.26);a.beginPath(),a.moveTo(t+o,e),a.lineTo(t+n-o,e),a.lineTo(t+n,e+o),a.lineTo(t+n,e+i-o),a.lineTo(t+n-o,e+i),a.lineTo(t+o,e+i),a.lineTo(t,e+i-o),a.lineTo(t,e+o),a.closePath()}panel(t,e,n,i,s=k.panel,a=10){const o=this.ctx;o.save(),o.shadowColor="rgba(255,70,18,.18)",o.shadowBlur=10,this.angularPath(t,e,n,i,a),o.fillStyle=s,o.fill(),o.shadowBlur=0,this.angularPath(t,e,n,i,a),o.strokeStyle=k.border,o.lineWidth=1.5,o.stroke(),o.restore()}button(t,e,n,i,s,a,o=!1,l=null,c=k.borderHot){const h=this.ctx;h.save(),this.angularPath(e,n,i,s,Math.min(8,s*.2)),h.fillStyle=o?"rgba(35,35,39,.96)":"rgba(48,23,17,.98)",h.fill(),h.strokeStyle=o?"rgba(120,120,120,.25)":c,h.lineWidth=o?1:1.5,h.stroke(),h.fillStyle=o?"#777":k.text,h.font=this.font(Math.min(23,s*.47)),h.textAlign="center",h.textBaseline="middle",h.fillText(t,e+i/2,n+s/2+1),h.restore();const u=this.touchDevice?5:0;let d={x:e-u,y:n-u,w:i+u*2,h:s+u*2};if(this.activeButtonClip){const f=this.activeButtonClip,g=Math.max(d.x,f.x),_=Math.max(d.y,f.y),p=Math.min(d.x+d.w,f.x+f.w),m=Math.min(d.y+d.h,f.y+f.h);if(p<=g||m<=_)return;d={x:g,y:_,w:p-g,h:m-_}}this.buttons.push({...d,onClick:a,disabled:o,onDenied:l})}drawStudioLogo(t,e,n,i,s=1){if(!this.studioLogoReady||!this.studioLogoImage.naturalWidth)return;const a=this.studioLogoImage,o=a.naturalWidth*(23/1200),l=a.naturalHeight*(415/1200),c=a.naturalWidth*(1163/1200),h=a.naturalHeight*(369/1200),u=Math.min(n/c,i/h),d=c*u,f=h*u,g=this.ctx;g.save(),g.globalAlpha*=s,g.drawImage(a,o,l,c,h,t-d/2,e-f/2,d,f),g.restore()}drawStart(t,e){const n=this.isMobileLandscape(),i=n||t<700||e<620,s=1+(this.hasSave&&!this.developerMode?1:0)+(this.ngPlusUnlocked&&!this.developerMode?1:0),a=Math.min(n?500:560,t-(n?18:32)),o=n?23:i?31:36,l=n?120+o+s*46+(this.bestRank&&!this.developerMode?18:0)+(this.developerMode?30:0):(i?214:232)+o+s*(i?58:60)+(this.bestRank&&!this.developerMode?24:0)+(this.developerMode?48:0),c=(t-a)/2,h=(e-l)/2;this.panel(c,h,a,l,k.panel,14);const u=this.ctx;u.textAlign="center",u.fillStyle=k.text,u.font=this.font(n?34:i?39:54),u.shadowColor="rgba(255,80,24,.7)",u.shadowBlur=12;const d=h+(n?38:i?51:60);u.fillText("HELLGATE MANOR",t/2,d),u.shadowBlur=0;const f=d+(n?19:i?25:29);this.drawStudioLogo(t/2,f,n?92:i?112:132,n?25:i?31:36),u.fillStyle=k.muted,u.font=this.dataFont(n?9:i?11:14,800);const g=f+(n?21:i?27:31);u.fillText("DEFEND THE MANOR.",t/2,g),this.bestRank&&!this.developerMode&&(u.fillStyle=k.orangeLight,u.font=this.dataFont(n?8:i?10:12,900),u.fillText(`BEST RANK  ${this.bestRank}`,t/2,g+(n?17:23)));const _=n?38:50;let p=g+(this.bestRank&&!this.developerMode?n?27:i?38:43:n?14:i?22:27);if(this.button("NEW GAME",t/2-105,p,210,_,()=>this.callbacks.onNewGame?.()),p+=_+(n?7:10),this.hasSave&&!this.developerMode&&(this.button("CONTINUE",t/2-105,p,210,_,()=>this.callbacks.onContinueSave?.()),p+=_+(n?7:10)),this.ngPlusUnlocked&&!this.developerMode&&(this.button("NEW GAME+ (HELL MODE)",t/2-130,p,260,_,()=>this.callbacks.onNewGamePlus?.(),!1,null,k.red),p+=_+(n?7:10)),this.developerMode){u.fillStyle=k.purple,u.font=this.dataFont(i?10:12,900);const m=this.developerShop?"SHOP TEST":"WAVE TEST";u.fillText(`DEVELOPER TEST — ${m} ${this.developerWave}`,t/2,h+l-22)}}drawHUD(t,e){if(this.isMobileLandscape())return this.drawMobileHUD(t,e);const n=t<820,i=n?12:20,s=n?62:68,a=e-i-s,o=n?145:180,l=n?168:215,c=Math.min(n?245:350,t*.35),h=i,u=(t-c)/2,d=t-i-l,f=this.ctx;this.panel(h,a,o,s,k.panel,8),f.textAlign="left",f.fillStyle=k.orangeLight,f.font=this.font(n?19:23),f.fillText(`WAVE ${this.wave}`,h+11,a+25),this.newGamePlus&&(f.fillStyle=k.red,f.font=this.dataFont(n?8:9,900),f.fillText("HELL MODE",h+o-(n?58:68),a+18)),f.fillStyle=k.text,f.font=this.dataFont(n?10:11,840),f.fillText(`DEMON DEATHS ${this.deaths}`,h+11,a+48),this.panel(u,a,c,s,k.panel,8),f.textAlign="center",f.fillStyle=k.text,f.font=this.font(n?17:20),f.fillText("MANOR",t/2,a+23);const g=u+13,_=a+35,p=c-26,m=Math.max(0,Math.min(1,this.health/this.maxHealth));f.fillStyle="rgba(255,255,255,.07)",f.fillRect(g,_,p,14),f.fillStyle=this.healthFlash>0||m<=.35?k.red:k.orange,f.fillRect(g,_,p*m,14),f.strokeStyle="rgba(255,255,255,.18)",f.strokeRect(g,_,p,14),f.fillStyle=k.text,f.font=this.dataFont(n?9:10,850),f.fillText(`${Math.ceil(this.health)} / ${this.maxHealth}`,t/2,_+12);const y=this.soulPulse>0?1+this.soulPulse*.11:1;f.save(),f.translate(d+l/2,a+s/2),f.scale(y,y),f.translate(-(d+l/2),-(a+s/2)),this.panel(d,a,l,s,k.panel,8),f.textAlign="left",f.fillStyle=k.orangeLight,f.font=this.dataFont(n?10:11,900),f.fillText("SOULS",d+14,a+18),f.fillStyle=k.orange,f.beginPath(),f.arc(d+18,a+38,7,0,Math.PI*2),f.fill(),f.fillStyle=k.text,f.font=this.dataFont(n?24:29,900),f.fillText(String(this.souls),d+34,a+47),f.restore(),this.soulPulse>0&&(f.save(),f.shadowColor="rgba(255,108,40,.95)",f.shadowBlur=12+this.soulPulse*24,this.angularPath(d-1,a-1,l+2,s+2,8),f.strokeStyle=`rgba(255,150,86,${.28+this.soulPulse})`,f.lineWidth=2,f.stroke(),f.restore());let x=a-44;if(this.boundSouls>0){const C=this.boundPulse>0?1+this.boundPulse*.08:1;f.save(),f.translate(d+l/2,x+36/2),f.scale(C,C),f.translate(-(d+l/2),-(x+36/2)),this.panel(d,x,l,36,k.panel,7),f.fillStyle=k.orangeLight,f.font=this.dataFont(n?9:10,900),f.textAlign="left",f.fillText("BOUND SOULS",d+12,x+14),f.fillStyle="#ffe2bb",f.font=this.dataFont(n?16:18,900),f.textAlign="right",f.fillText(String(this.boundSouls),d+l-12,x+24),f.restore(),x-=42}if(this.bombs>0){const M=n?132:150;this.button(`HELL BOMB ×${this.bombs}`,t-i-M,x,M,36,()=>this.callbacks.onBomb?.(),!1)}this.drawSoulFlights(t,e)}drawMobileHUD(t,e){const n=this.ctx,i=5,s=36,a=e-i-s,o=Math.min(98,t*.155),l=Math.min(106,t*.165),c=Math.min(205,Math.max(150,t*.265)),h=i,u=t-i-l,d=(t-c)/2;this.panel(h,a,o,s,"rgba(7,8,11,.90)",6),n.textAlign="left",n.fillStyle=k.orangeLight,n.font=this.font(13),n.fillText(`WAVE ${this.wave}`,h+7,a+15),n.fillStyle=k.text,n.font=this.dataFont(7,850),n.fillText(`DEATHS ${this.deaths}`,h+7,a+29),this.newGamePlus&&(n.textAlign="right",n.fillStyle=k.red,n.font=this.dataFont(6,900),n.fillText("HELL",h+o-6,a+13)),this.panel(d,a,c,s,"rgba(7,8,11,.90)",6),n.textAlign="center",n.fillStyle=k.text,n.font=this.font(12),n.fillText("MANOR",t/2,a+14);const f=d+8,g=a+22,_=c-16,p=Math.max(0,Math.min(1,this.health/this.maxHealth));n.fillStyle="rgba(255,255,255,.07)",n.fillRect(f,g,_,8),n.fillStyle=this.healthFlash>0||p<=.35?k.red:k.orange,n.fillRect(f,g,_*p,8),n.strokeStyle="rgba(255,255,255,.18)",n.strokeRect(f,g,_,8),n.fillStyle=k.text,n.font=this.dataFont(6,900),n.fillText(`${Math.ceil(this.health)} / ${this.maxHealth}`,t/2,g+7);const m=this.soulPulse>0?1+this.soulPulse*.065:1;n.save(),n.translate(u+l/2,a+s/2),n.scale(m,m),n.translate(-(u+l/2),-(a+s/2)),this.panel(u,a,l,s,"rgba(7,8,11,.90)",6),n.textAlign="left",n.fillStyle=k.orangeLight,n.font=this.dataFont(7,900),n.fillText("SOULS",u+8,a+12),n.fillStyle=k.orange,n.beginPath(),n.arc(u+11,a+25,4,0,Math.PI*2),n.fill(),n.fillStyle=k.text,n.font=this.dataFont(16,900),n.fillText(String(this.souls),u+20,a+30),n.restore();let y=a-26;this.boundSouls>0&&(this.panel(u,y,l,22,"rgba(7,8,11,.88)",5),n.textAlign="left",n.fillStyle=k.orangeLight,n.font=this.dataFont(6,900),n.fillText("BOUND",u+7,y+9),n.textAlign="right",n.fillStyle="#ffe2bb",n.font=this.dataFont(11,900),n.fillText(String(this.boundSouls),u+l-7,y+16),y-=26),this.bombs>0&&this.button(`BOMB ×${this.bombs}`,u+l-78,y,78,25,()=>this.callbacks.onBomb?.()),this.drawSoulFlights(t,e)}getSoulCounterPosition(t,e){if(this.isMobileLandscape()){const u=Math.min(106,t*.165);return{x:t-5-u+13,y:e-5-36+25}}const n=t<820,i=n?12:20,s=n?62:68,a=e-i-s,o=n?168:215;return{x:t-i-o+25,y:a+38}}drawSoulFlights(t,e){if(this.soulFlights.length===0)return;const n=this.getSoulCounterPosition(t,e),i=this.ctx;for(const s of this.soulFlights){const a=Math.min(1,s.age/s.duration),o=1-Math.pow(1-a,3),l=(s.x+n.x)*.5,c=Math.min(s.y,n.y)-90,h=1-o,u=h*h*s.x+2*h*o*l+o*o*n.x,d=h*h*s.y+2*h*o*c+o*o*n.y,f=(5+(1-a)*4)*(s.scale??1);i.save(),i.globalAlpha=.45+(1-a)*.55,i.shadowColor="rgba(255,111,38,.95)",i.shadowBlur=16,i.fillStyle="#ffd29a",i.beginPath(),i.arc(u,d,f,0,Math.PI*2),i.fill(),i.restore()}}drawPauseButton(t){const e=this.isMobileLandscape(),n=t<820,i=e?44:n?42:46,s=e?7:n?12:18,a=t-s-i,o=s,l=this.ctx;this.panel(a,o,i,i,"rgba(7,8,11,.88)",7),l.fillStyle=k.orangeLight,l.fillRect(a+i*.32,o+i*.27,i*.11,i*.46),l.fillRect(a+i*.57,o+i*.27,i*.11,i*.46),this.buttons.push({x:a,y:o,w:i,h:i,onClick:()=>this.callbacks.onPause?.(),disabled:!1})}drawPaused(t,e){const n=this.isMobileLandscape(),i=n||t<700||e<620,s=this.ctx;s.fillStyle="rgba(0,0,0,.68)",s.fillRect(0,0,t,e);const a=Math.min(n?390:430,t-(n?18:30)),o=n?Math.min(250,e-18):i?260:285,l=(t-a)/2,c=(e-o)/2;this.panel(l,c,a,o,k.panel,13),s.textAlign="center",s.fillStyle=k.text,s.font=this.font(n?27:Math.min(40,t*.065)),s.shadowColor="rgba(255,80,24,.55)",s.shadowBlur=9,s.fillText("HELLGATE MANOR",t/2,c+(n?36:48)),s.shadowBlur=0,this.drawStudioLogo(t/2,c+(n?54:70),n?86:112,n?24:31),s.fillStyle=k.orangeLight,s.font=this.font(n?25:32),s.fillText("PAUSED",t/2,c+(n?91:113)),s.fillStyle=k.muted,s.font=this.dataFont(n?8:11,800),s.fillText(n?"TAP RESUME TO RETURN":"ESC OR RESUME TO RETURN",t/2,c+(n?110:137));const h=n?40:50;this.button("RESUME",t/2-105,c+o-h-(n?18:24),210,h,()=>this.callbacks.onPause?.())}drawBanner(t,e){const n=this.ctx;n.save(),n.globalAlpha=Math.min(1,this.bannerTimer/.35),n.textAlign="center",n.fillStyle=k.text,n.font=this.font(Math.min(55,t*.06)),n.shadowColor="rgba(255,80,24,.7)",n.shadowBlur=10,n.fillText(this.bannerTitle,t/2,e*.34),n.shadowBlur=0,this.bannerSubtitle&&(n.fillStyle=k.orangeLight,n.font=this.dataFont(14,800),n.fillText(this.bannerSubtitle,t/2,e*.34+32)),n.restore()}drawResults(t,e){if(this.isMobileLandscape())return this.drawMobileResults(t,e);const n=this.ctx;n.fillStyle="rgba(0,0,0,.76)",n.fillRect(0,0,t,e);const i=t<720||e<620,s=Math.min(i?t-24:610,t-24),a=Math.min(i?430:475,e-24),o=(t-s)/2,l=(e-a)/2;this.panel(o,l,s,a,k.panel,14),n.textAlign="center",n.fillStyle=k.text,n.font=this.font(i?34:46),n.fillText(`WAVE ${this.wave} SURVIVED`,t/2,l+(i?52:64));const c=this.waveResults,h=o+(i?20:34),u=s-(i?40:68),d=i?50:54,f=l+(i?82:96);[["SOULS COLLECTED",`+${c.souls}`,k.orange],["DEMONS DESTROYED",String(c.deaths),k.orangeLight],["MANOR DAMAGE",c.damage>0?`-${c.damage}`:"0",c.damage>0?k.red:k.text],["MANOR CONDITION",`${Math.ceil(c.health)} / ${c.maxHealth}`,k.text]].forEach(([p,m,y],x)=>{const M=f+x*(d+6);this.panel(h,M,u,d,k.panel2,7),n.textAlign="left",n.fillStyle=k.muted,n.font=this.dataFont(i?10:12,850),n.fillText(p,h+16,M+21),n.fillStyle=y,n.font=this.dataFont(i?22:26,900),n.textAlign="right",n.fillText(m,h+u-16,M+35)});const _=f+4*(d+6)+4;n.save(),n.translate(t/2-84,_+11),n.strokeStyle=c.saved?k.orangeLight:k.muted,n.lineWidth=2,n.strokeRect(0,0,16,16),n.strokeRect(4,2,8,5),n.fillStyle=c.saved?k.orange:k.muted,n.fillRect(4,11,8,3),n.restore(),n.textAlign="left",n.fillStyle=c.saved?k.orangeLight:k.muted,n.font=this.dataFont(i?10:12,900),n.fillText(c.saved?"GAME DATA SAVED":"SAVE UNAVAILABLE",t/2-60,_+25),this.button("UPGRADES",t/2-110,l+a-(i?58:64),220,i?46:48,()=>this.callbacks.onResultsContinue?.())}drawMobileResults(t,e){const n=this.ctx;n.fillStyle="rgba(0,0,0,.76)",n.fillRect(0,0,t,e);const i=Math.min(620,t-16),s=e-14,a=(t-i)/2,o=7;this.panel(a,o,i,s,k.panel,11),n.textAlign="center",n.fillStyle=k.text,n.font=this.font(27),n.fillText(`WAVE ${this.wave} SURVIVED`,t/2,o+34);const l=this.waveResults,c=7,h=(i-34-c)/2,u=57,d=a+17,f=o+49;[["SOULS COLLECTED",`+${l.souls}`,k.orange],["DEMONS DESTROYED",String(l.deaths),k.orangeLight],["MANOR DAMAGE",l.damage>0?`-${l.damage}`:"0",l.damage>0?k.red:k.text],["MANOR CONDITION",`${Math.ceil(l.health)} / ${l.maxHealth}`,k.text]].forEach(([p,m,y],x)=>{const M=x%2,C=Math.floor(x/2),T=d+M*(h+c),w=f+C*(u+c);this.panel(T,w,h,u,k.panel2,6),n.textAlign="left",n.fillStyle=k.muted,n.font=this.dataFont(8,850),n.fillText(p,T+11,w+18),n.fillStyle=y,n.font=this.dataFont(19,900),n.fillText(m,T+11,w+43)});const _=f+2*(u+c)+2;n.textAlign="center",n.fillStyle=l.saved?k.orangeLight:k.muted,n.font=this.dataFont(9,900),n.fillText(l.saved?"▣  GAME DATA SAVED":"SAVE UNAVAILABLE",t/2,_+14),this.button("UPGRADES",t/2-94,o+s-43,188,36,()=>this.callbacks.onResultsContinue?.())}drawIntermission(t,e){if(this.isMobileLandscape())return this.drawMobileIntermission(t,e);const n=this.ctx;n.fillStyle="rgba(0,0,0,.72)",n.fillRect(0,0,t,e);const i=t<760||e<700,s=Math.min(840,t-(i?18:50)),a=Math.min(i?e-16:650,e-18),o=(t-s)/2,l=(e-a)/2;this.panel(o,l,s,a,k.panel,14),n.textAlign="center",n.fillStyle=k.text,n.font=this.font(i?31:43),n.fillText("MANOR UPGRADES",t/2,l+(i?42:52));const c=i?38:42,h=o+s-c-16,u=l+13;n.save(),this.angularPath(h,u,c,c,6),n.fillStyle="rgba(48,23,17,.98)",n.fill(),n.strokeStyle=k.borderHot,n.lineWidth=1.5,n.stroke(),n.strokeStyle=k.orangeLight,n.lineWidth=2,n.strokeRect(h+11,u+9,16,18),n.strokeRect(h+15,u+11,8,6),n.fillStyle=k.orange,n.fillRect(h+15,u+22,8,3),n.restore(),this.buttons.push({x:h,y:u,w:c,h:c,onClick:()=>this.callbacks.onSave?.(),disabled:!1}),this.saveNoticeTimer>0&&(n.textAlign="right",n.fillStyle=this.saveNoticeSuccess?k.orangeLight:k.muted,n.font=this.dataFont(i?9:11,900),n.fillText(this.saveNoticeSuccess?"GAME DATA SAVED":"SAVE UNAVAILABLE",h-10,u+c/2+4),n.textAlign="center");const d=i?76:104,f=l+(i?64:77),g=l+(i?88:104),_=Math.max(0,Math.min(1,this.maxHealth>0?this.health/this.maxHealth:0)),p=_<=.25?k.red:_<=.55?k.amber:k.text;n.textAlign="center",n.fillStyle=k.orangeLight,n.font=this.dataFont(i?11:12,900),n.fillText("SOULS",t/2-d,f),n.fillStyle=k.orange,n.font=this.dataFont(i?24:29,900),n.fillText(String(this.souls),t/2-d,g),n.fillStyle=k.orangeLight,n.font=this.dataFont(i?11:12,900),n.fillText("MANOR HP",t/2+d,f),n.fillStyle=p,n.font=this.dataFont(i?20:24,900),n.fillText(`${Math.ceil(this.health)} / ${Math.ceil(this.maxHealth)}`,t/2+d,g);const m=["MANOR","SYSTEMS","BOUND SOULS"],y=l+(i?101:118),x=6,M=(s-32-x*2)/3;m.forEach((P,U)=>{this.button(P,o+16+U*(M+x),y,M,i?42:44,()=>{this.shopPage=U},!1,null,U===this.shopPage?k.borderHot:k.borderSoft)});const C=y+(i?50:54),T=i?58:68,w=l+a-T-C;this.shopPage===0?this.drawManorShop(o+16,C,s-32,w,i):this.shopPage===1?this.drawSystemsShop(o+16,C,s-32,w,i):this.drawAssignments(o+16,C,s-32,w,i),this.button("CONTINUE",t/2-108,l+a-(i?52:58),216,i?44:46,()=>this.callbacks.onContinue?.())}drawMobileIntermission(t,e){const n=this.ctx;n.fillStyle="rgba(0,0,0,.76)",n.fillRect(0,0,t,e);const i=7,s=i,a=i,o=t-i*2,l=e-i*2;this.panel(s,a,o,l,k.panel,11),n.textAlign="left",n.fillStyle=k.text,n.font=this.font(25),n.fillText("MANOR UPGRADES",s+16,a+31),n.fillStyle=k.orangeLight,n.font=this.dataFont(8,900),n.fillText("SOULS",s+18,a+50),n.fillStyle=k.orange,n.font=this.dataFont(20,900),n.fillText(String(this.souls),s+64,a+51);const c=Math.max(0,Math.min(1,this.maxHealth>0?this.health/this.maxHealth:0)),h=c<=.25?k.red:c<=.55?k.amber:k.text;n.fillStyle=k.orangeLight,n.font=this.dataFont(8,900),n.fillText("MANOR HP",s+132,a+50),n.fillStyle=h,n.font=this.dataFont(15,900),n.fillText(`${Math.ceil(this.health)} / ${Math.ceil(this.maxHealth)}`,s+198,a+51);const u=36,d=s+o-u-12,f=a+10;n.save(),this.angularPath(d,f,u,u,5),n.fillStyle="rgba(48,23,17,.98)",n.fill(),n.strokeStyle=k.borderHot,n.lineWidth=1.5,n.stroke(),n.strokeStyle=k.orangeLight,n.lineWidth=1.8,n.strokeRect(d+10,f+8,15,17),n.strokeRect(d+14,f+10,7,5),n.fillStyle=k.orange,n.fillRect(d+14,f+21,7,3),n.restore(),this.buttons.push({x:d-4,y:f-4,w:u+8,h:u+8,onClick:()=>this.callbacks.onSave?.(),disabled:!1}),this.saveNoticeTimer>0&&(n.textAlign="right",n.fillStyle=this.saveNoticeSuccess?k.orangeLight:k.muted,n.font=this.dataFont(8,900),n.fillText(this.saveNoticeSuccess?"GAME DATA SAVED":"SAVE UNAVAILABLE",d-8,f+21));const g=["MANOR","SYSTEMS","BOUND SOULS"],_=a+61,p=5,m=(o-24-p*2)/3;g.forEach((v,b)=>{this.button(v,s+12+b*(m+p),_,m,38,()=>{this.shopPage=b,this.shopScroll=0},!1,null,b===this.shopPage?k.borderHot:k.borderSoft)});const y=50,x=_+44,M=a+l-y,C=Math.max(90,M-x),T=s+12,w=o-24;this.shopViewport={x:T,y:x,w,h:C};let P=330;if(this.shopPage===2){const v=[this.buildings.hellfire,this.buildings.demolition,this.buildings.undercroft,this.buildings.occult].filter(Boolean).length;P=v>0?42+v*86+Math.max(0,v-1)*8:130}this.shopScrollMax=Math.max(0,P-C),this.shopScroll=Math.max(0,Math.min(this.shopScrollMax,this.shopScroll)),n.save(),n.beginPath(),n.rect(T,x,w,C),n.clip(),this.activeButtonClip=this.shopViewport;const U=x-this.shopScroll;if(this.shopPage===0?this.drawManorShop(T,U,w,P,!0):this.shopPage===1?this.drawSystemsShop(T,U,w,P,!0):this.drawAssignments(T,U,w,P,!0),this.activeButtonClip=null,n.restore(),this.shopScrollMax>0){const v=s+o-6,b=x+4,F=C-8,O=Math.max(28,F*(C/P)),V=b+(F-O)*(this.shopScroll/this.shopScrollMax);n.fillStyle="rgba(255,255,255,.08)",n.fillRect(v,b,2,F),n.fillStyle=k.orange,n.fillRect(v-1,V,4,O),n.textAlign="right",n.fillStyle=k.muted,n.font=this.dataFont(7,800),n.fillText("SWIPE TO SCROLL",s+o-14,M-6)}this.button("CONTINUE",t/2-94,a+l-43,188,36,()=>this.callbacks.onContinue?.())}drawManorShop(t,e,n,i,s){const a=this.fortifyLevel>=$.manor.maxFortifyLevel,o=a||this.fortifyLevel+$.manor.majorFortify.levels>$.manor.maxFortifyLevel,l=[["PATCH DAMAGE","+50 HEALTH",$.manor.repairs.minor.cost,"repairMinor",this.health>=this.maxHealth],["MAJOR REPAIR","+250 HEALTH",$.manor.repairs.major.cost,"repairMajor",this.health>=this.maxHealth],["RESTORE MANOR","+1000 HEALTH",$.manor.repairs.full.cost,"repairFull",this.health>=this.maxHealth],["FORTIFY","+100 MAX HEALTH",this.purchaseCosts.fortify??$.manor.fortify.baseCost,"fortify",a,!1,a?"MAX":null],["MAJOR FORTIFY","+1000 MAX HEALTH",this.purchaseCosts.majorFortify??$.manor.majorFortify.baseCost,"majorFortify",o,!1,o?"MAX":null]];this.drawShopRows(l,t,e,n,i,s)}drawSystemsShop(t,e,n,i,s){const a=$.buildings,o=this.wave<(a.extraction.unlockWave??1);let l;if(!this.buildings.extraction||this.extractionLevel<=0)l=["SOUL EXTRACTION","1 BINDING SLOT — DROP A DEMON INTO THE GLOWING PORTAL",a.extraction.cost,"extraction",!1,o];else if(this.extractionLevel<$.extraction.maxLevel){const u=this.extractionLevel+1;l=[`SOUL EXTRACTION — ${this.extractionLevel} SLOT${this.extractionLevel===1?"":"S"}`,`UPGRADE TO ${u} SIMULTANEOUS BINDING SLOTS`,this.purchaseCosts.extractionUpgrade??(u===2?a.extractionUpgrade2.cost:a.extractionUpgrade3.cost),"extractionUpgrade",!1,!1]}else l=["SOUL EXTRACTION — 3 SLOTS","MAXIMUM BINDING CAPACITY",0,"extractionUpgrade",!0,!1,"MAX"];const c=(u,d,f)=>{const g=a[u],_=this.wave<(g.unlockWave??1),p=!this.buildings.extraction,m=_||p;let y=f;return!_&&p&&(y="REQUIRES SOUL EXTRACTION"),[d,y,g.cost,u,this.buildings[u],m]},h=[l,c("hellfire","HELLFIRE BATTERY","BOUND SOULS BUILD AND SPEED UP CROSSBOW DEFENCES"),c("demolition","HELL BOMB FORGE","15 BOUND SOULS = 1 BOMB AT WAVE START — MAX 3"),c("undercroft","UNDERCROFT","BOUND SOULS REPAIR THE MANOR BETWEEN WAVES"),c("occult","OCCULT TOWER","LIGHT-PURPLE GROUND FIRE STRIKES ACTIVE DEMONS")];this.drawShopRows(h,t,e,n,i,s,!0)}drawShopRows(t,e,n,i,s,a,o=!1){const l=a?5:8,c=Math.max(a?48:54,Math.min(a?62:76,(s-l*(t.length-1))/t.length));t.forEach((h,u)=>{const[d,f,g,_,p=!1,m=!1,y=null]=h,x=n+u*(c+l);this.panel(e,x,i,c,k.panel2,7);const M=this.ctx;M.textAlign="left",M.fillStyle=m?"#777":k.orangeLight,M.font=this.font(a?18:23),M.fillText(d,e+13,x+(a?23:28)),M.fillStyle=m?"#666":k.muted,M.font=this.dataFont(a?9:11,780),M.fillText(f,e+13,x+(a?42:51));const C=a?112:138,T=a?42:46,w=e+i-C-10,P=x+(c-T)/2,U=o&&p&&y!=="MAX",b=m||U||y==="MAX"||!o&&p||this.souls<g,F=y??(m?"LOCKED":U?"OWNED":`${g}`);this.button(F,w,P,C,T,()=>this.callbacks.onPurchase?.(_),b,()=>this.callbacks.onDeniedPurchase?.())})}drawAssignments(t,e,n,i,s){const a=this.ctx;a.textAlign="center",a.fillStyle=k.orangeLight,a.font=this.dataFont(s?13:15,900),a.fillText(`BOUND SOULS: ${this.boundSouls}    UNASSIGNED: ${this.unassignedSouls}`,t+n/2,e+22);const o=[["hellfire","HELLFIRE",this.buildings.hellfire,k.orange],["demolition","HELL BOMB FORGE",this.buildings.demolition,k.red],["undercroft","UNDERCROFT",this.buildings.undercroft,k.amber],["occult","OCCULT",this.buildings.occult,k.purple]].filter(u=>u[2]);if(o.length===0){a.fillStyle=k.muted,a.font=this.dataFont(13,800),a.fillText("PURCHASE A BOUND-SOUL SYSTEM TO ASSIGN YOUR CONVERTED DEMONS.",t+n/2,e+72);return}const l=e+36,c=8,h=Math.max(s?76:78,Math.min(s?86:92,(i-42-c*(o.length-1))/o.length));o.forEach(([u,d,,f],g)=>{const _=l+g*(h+c);this.panel(t,_,n,h,k.panel2,7),a.textAlign="left",a.fillStyle=f,a.font=this.font(s?21:25),a.fillText(d,t+16,_+31);const p=this.assignments[u]??0,m=$.boundCaps[u]??1/0,y=p>=m;a.fillStyle=k.text,a.font=this.dataFont(12,850),a.fillText(y?`${p} ASSIGNED — MAX`:`${p} ASSIGNED`,t+16,_+51),a.fillStyle=k.muted,a.font=this.dataFont(s?9:10,800);let x="";if(u==="hellfire"){let P=0,U=0,v="";p>0&&p<10?(P=1,U=7-Math.min(1,(p-1)/8)*3.2,v=" • 2ND CROSSBOW AT 10"):p>=10&&p<25?(P=2,U=7-Math.min(1,(p-10)/14)*3.4,v=" • 3RD CROSSBOW AT 25"):p>=25&&(P=3,U=7-Math.min(1,(p-25)/20)*4.6),x=p>0?`${P} CROSSBOW${P===1?"":"S"} • ${U.toFixed(1)}s RELOAD${v}`:"NO DEFENCE ACTIVE"}else if(u==="demolition"){const P=Math.min($.defence.bombMaxCharges,Math.floor(p/$.defence.bombSoulsPerCharge));x=P>0?`${P} HELL BOMB${P===1?"":"S"} AT THE START OF EACH WAVE`:`${$.defence.bombSoulsPerCharge} BOUND SOULS NEEDED FOR 1 WAVE BOMB`}else if(u==="undercroft")x=`+${p*6} MANOR HEALTH AFTER EACH WAVE`;else if(u==="occult"){const P=p<=0?0:13.5-Math.min(1,(p-1)/29)*7.5,U=p>=20?3:p>=10?2:p>0?1:0;x=p>0?`${U} PURPLE FIRE STRIKE${U===1?"":"S"} ABOUT EVERY ${P.toFixed(1)}s`:"NO OCCULT STRIKES"}a.fillText(x,t+16,_+68);const M=s?46:50,C=t+n-M-12,T=C-M-10,w=_+(h-M)/2;this.button("−",T,w,M,M,()=>this.callbacks.onAssign?.(u,-1),p<=0,()=>this.callbacks.onDeniedPurchase?.(),f),this.button(y?"MAX":"+",C,w,M,M,()=>this.callbacks.onAssign?.(u,1),y||this.unassignedSouls<=0,()=>this.callbacks.onDeniedPurchase?.(),f)})}drawTutorial(t,e){if(!this.tutorial)return;this.buttons=[];const n=this.ctx;n.fillStyle="rgba(0,0,0,.72)",n.fillRect(0,0,t,e);const i=t<700||e<620,s=Math.min(i?t-28:590,t-28),a=i?304:326,o=(t-s)/2,l=(e-a)/2;this.panel(o,l,s,a,k.panel,14),n.textAlign="center",n.fillStyle=k.orangeLight,n.font=this.font(i?31:40),n.fillText(this.tutorial.title,t/2,l+55);const c=l+(i?96:104),h=t/2-(i?96:112),u=i?104:122,d=this.tutorialDemonReady&&this.tutorialDemonImage.naturalHeight>0?u*(this.tutorialDemonImage.naturalWidth/this.tutorialDemonImage.naturalHeight):u*.58;n.save();const f=n.createRadialGradient(h,c+u*.5,4,h,c+u*.5,u*.62);f.addColorStop(0,"rgba(255,105,35,.20)"),f.addColorStop(1,"rgba(255,75,20,0)"),n.fillStyle=f,n.beginPath(),n.arc(h,c+u*.5,u*.62,0,Math.PI*2),n.fill(),this.tutorialDemonReady&&(n.shadowColor="rgba(255,93,27,.38)",n.shadowBlur=12,n.drawImage(this.tutorialDemonImage,h-d/2,c,d,u)),n.restore(),n.fillStyle=k.orange,n.font=this.dataFont(28,900),n.fillText("→",t/2,c+(i?48:56));const g=c+(i?50:58),_=t/2+(i?92:108),p=n.createRadialGradient(_,g,2,_,g,i?31:36);p.addColorStop(0,"rgba(255,255,235,1)"),p.addColorStop(.35,"rgba(255,184,96,.95)"),p.addColorStop(1,"rgba(255,93,24,0)"),n.fillStyle=p,n.beginPath(),n.arc(_,g,i?32:38,0,Math.PI*2),n.fill(),n.fillStyle=k.text,n.font=this.dataFont(i?10:12,850),this.tutorial.lines.forEach((m,y)=>{n.fillText(m,t/2,l+(i?190:196)+y*(i?18:20))}),this.button("GOT IT",t/2-95,l+a-58,190,42,()=>{this.tutorial=null})}drawGameOver(t,e){const n=this.ctx;n.fillStyle="rgba(0,0,0,.75)",n.fillRect(0,0,t,e);const i=Math.min(550,t-28),s=this.canRetry?300:250,a=(t-i)/2,o=(e-s)/2;this.panel(a,o,i,s,k.panel,14),n.textAlign="center",n.fillStyle=k.red,n.font=this.font(Math.min(46,t*.07)),n.fillText("THE MANOR HAS FALLEN",t/2,o+68),n.fillStyle=k.muted,n.font=this.dataFont(12,800),n.fillText(`WAVE ${this.wave} — ${this.deaths} DEMON DEATHS`,t/2,o+104),this.canRetry?(n.fillStyle=k.orangeLight,n.font=this.dataFont(11,900),n.fillText(`CONTINUES LEFT: ${this.continuesRemaining}`,t/2,o+128),this.button("RETRY WAVE",t/2-110,o+148,220,50,()=>this.callbacks.onRetry?.()),this.button("NEW GAME",t/2-110,o+212,220,46,()=>this.callbacks.onRestart?.())):(n.fillStyle=k.red,n.font=this.dataFont(11,900),n.fillText("NO CONTINUES REMAIN",t/2,o+132),this.button("NEW GAME",t/2-110,o+158,220,50,()=>this.callbacks.onRestart?.()))}drawDeveloperPanel(t,e){this.buttons=[];const n=this.ctx;n.fillStyle="rgba(0,0,0,.84)",n.fillRect(0,0,t,e);const i=Math.min(720,t-48),s=Math.min(650,e-36),a=(t-i)/2,o=(e-s)/2;this.panel(a,o,i,s,"rgba(8,7,13,.98)",14),n.textAlign="center",n.fillStyle=k.purple,n.font=this.font(38),n.fillText("DEVELOPER TEST",t/2,o+52),n.fillStyle=k.muted,n.font=this.dataFont(10,850),n.fillText("ESC TO CLOSE — TEST MODE DOES NOT SAVE",t/2,o+77);const l=o+100;n.fillStyle=k.text,n.font=this.dataFont(14,900),n.fillText(`TEST WAVE  ${this.developerWave}`,t/2,l+25),this.button("−5",a+80,l,72,42,()=>this.callbacks.onDevWaveChange?.(-5)),this.button("−",a+162,l,72,42,()=>this.callbacks.onDevWaveChange?.(-1)),this.button("+",a+i-234,l,72,42,()=>this.callbacks.onDevWaveChange?.(1)),this.button("+5",a+i-152,l,72,42,()=>this.callbacks.onDevWaveChange?.(5));const c=l+62;this.button("START WAVE",a+38,c,190,46,()=>this.callbacks.onDevStartWave?.(),!1,null,k.purple),this.button("OPEN UPGRADES",t/2-95,c,190,46,()=>this.callbacks.onDevOpenShop?.(),!1,null,k.purple),this.button("TEST ENDING",a+i-228,c,190,46,()=>this.callbacks.onDevDawn?.(),!1,null,k.purple);const h=c+64;this.button("+1000 SOULS",a+38,h,190,44,()=>this.callbacks.onDevAddSouls?.(1e3)),this.button(this.newGamePlus?"NG+ ON":"NG+ OFF",t/2-88,h,176,44,()=>this.callbacks.onDevToggleNGPlus?.(),!1,null,this.newGamePlus?k.red:k.purple),this.button("+10 BOUND SOULS",a+i-228,h,190,44,()=>this.callbacks.onDevAddBound?.(10)),n.fillStyle=k.orangeLight,n.font=this.dataFont(12,900),n.fillText("UNLOCK SYSTEMS",t/2,h+78);const u=[["EXTRACTION","extraction"],["HELLFIRE","hellfire"],["BOMB FORGE","demolition"],["UNDERCROFT","undercroft"],["OCCULT","occult"]],d=118,f=8,g=u.length*d+(u.length-1)*f,_=t/2-g/2;u.forEach(([p,m],y)=>{this.button(p,_+y*(d+f),h+92,d,42,()=>this.callbacks.onDevUnlock?.(m),!1,null,k.purple)}),n.fillStyle=k.muted,n.font=this.dataFont(10,800),n.fillText(`CURRENT: ${this.souls} SOULS • ${this.boundSouls} BOUND SOULS`,t/2,h+162),this.button("CLOSE",t/2-95,o+s-62,190,44,()=>this.callbacks.onDevClose?.())}drawStars(t,e,n,i=24){const s=this.ctx;s.save(),s.textAlign="left",s.font=`900 ${i}px "Segoe UI Symbol","Arial Unicode MS",Arial,sans-serif`;for(let a=0;a<5;a+=1)s.fillStyle=a<t?"#ffd08a":"rgba(255,255,255,.18)",s.fillText(a<t?"★":"☆",e+a*i*1.05,n);s.restore()}fadeInAt(t,e,n=.8){return Math.max(0,Math.min(1,(t-e)/n))}drawEnding(t,e){const n=this.endingData;if(!n)return;const i=this.ctx,s=this.endingElapsed,a=this.fadeInAt(s,5,1.1),o=this.fadeInAt(s,7.8,1),l=this.fadeInAt(s,10.5,1);i.textAlign="center",a>0&&(i.save(),i.globalAlpha=a,i.fillStyle="#fff0d3",i.font=this.font(Math.min(58,t*.06)),i.shadowColor="rgba(255,170,90,.45)",i.shadowBlur=12,i.fillText("THE NIGHT IS OVER",t/2,e*.23),i.restore()),o>0&&(i.save(),i.globalAlpha=o,i.fillStyle=k.text,i.font=this.dataFont(Math.min(18,t*.018),900),i.fillText("YOU DEFEATED ALL THE DEMONS",t/2,e*.23+42),i.restore()),l>0&&(i.save(),i.globalAlpha=l,i.fillStyle=k.orangeLight,i.font=this.dataFont(Math.min(16,t*.016),900),i.fillText("HELLGATE MANOR STILL STANDS",t/2,e*.23+72),i.restore());const c=this.fadeInAt(s,13.2,.9);if(c<=0)return;const h=this.isMobileLandscape(),u=h||t<760||e<650,d=Math.min(u?t-18:650,t-18),f=h?Math.min(350,e-12):u?452:492,g=(t-d)/2,_=h?6:Math.min(e-f-18,e*.39);i.save(),i.globalAlpha=c,this.panel(g,_,d,f,"rgba(7,8,11,.83)",14),i.restore(),i.textAlign="center",i.fillStyle=n.newGamePlus?k.red:k.orangeLight,i.font=this.font(h?24:u?28:34),i.fillText(n.newGamePlus?"HELL MODE COMPLETE":"FINAL REPORT",t/2,_+(h?34:44));const p=[["SURVIVAL",n.survival,14.1],["DEFENCE",n.defence,16.5],["BINDING",n.binding,18.9]],m=g+(h?18:28),y=d-(h?36:56),x=h?50:u?67:70;p.forEach(([C,T,w],P)=>{const U=this.fadeInAt(s,w,.65);if(U<=0)return;const v=_+(h?48:64)+P*(x+(h?5:7));i.save(),i.globalAlpha=U,this.panel(m,v,y,x,"rgba(13,13,17,.90)",7),i.textAlign="left",i.fillStyle=k.text,i.font=this.font(h?17:u?20:23),i.fillText(C,m+14,v+(h?21:28)),i.fillStyle=k.muted,i.font=this.dataFont(h?7:u?8:10,820),i.fillText(T.detail,m+14,v+(h?37:49)),this.drawStars(T.stars,m+y-(h?108:u?128:150),v+(h?34:43),h?17:u?20:23),i.restore()});const M=this.fadeInAt(s,21.6,.9);if(M>0&&(i.save(),i.globalAlpha=M,i.textAlign="center",i.fillStyle=k.muted,i.font=this.dataFont(11,900),i.fillText("FINAL RANK",t/2,_+f-(h?112:132)),i.fillStyle=n.finalRank==="S"?"#ffe5a8":n.finalRank==="A"?k.orangeLight:k.text,i.font=this.font(h?45:u?54:66),i.shadowColor=n.newGamePlus?"rgba(239,81,78,.8)":"rgba(255,112,49,.75)",i.shadowBlur=18,i.fillText(n.finalRank,t/2,_+f-(h?68:78)),i.restore()),s>=24.5){const C=_+f-(h?43:u?54:60);h?(this.button("NEW GAME",t/2-204,C,174,36,()=>this.callbacks.onRestart?.()),this.button("NEW GAME+ (HELL MODE)",t/2-20,C,224,36,()=>this.callbacks.onNewGamePlus?.(),!1,null,k.red)):u?(this.button("NEW GAME",t/2-208,C,185,42,()=>this.callbacks.onRestart?.()),this.button("NEW GAME+ (HELL MODE)",t/2-13,C,220,42,()=>this.callbacks.onNewGamePlus?.(),!1,null,k.red)):(this.button("NEW GAME",t/2-252,C,205,46,()=>this.callbacks.onRestart?.()),this.button("NEW GAME+ (HELL MODE)",t/2-27,C,280,46,()=>this.callbacks.onNewGamePlus?.(),!1,null,k.red))}}drawComplete(t,e){const n=this.ctx;n.fillStyle="rgba(0,0,0,.16)",n.fillRect(0,0,t,e);const i=Math.min(650,t-30),s=330,a=(t-i)/2,o=(e-s)/2;this.panel(a,o,i,s,"rgba(7,8,11,.80)",15),n.textAlign="center",n.fillStyle="#ffe2b8",n.font=this.font(Math.min(54,t*.07)),n.fillText("CONGRATULATIONS",t/2,o+76),n.fillStyle=k.text,n.font=this.dataFont(16,900),n.fillText("THE NIGHT IS OVER — HELLGATE MANOR STILL STANDS",t/2,o+120),n.fillStyle=k.muted,n.font=this.dataFont(13,800),n.fillText(`${this.deaths} DEMON DEATHS  •  ${this.boundSouls} BOUND SOULS`,t/2,o+158),this.button("NEW GAME",t/2-110,o+205,220,50,()=>this.callbacks.onRestart?.())}dispose(){window.removeEventListener("pointerdown",this.onPointerDown,!0),window.removeEventListener("pointermove",this.onPointerMove,!0),window.removeEventListener("pointerup",this.onPointerUp,!0),window.removeEventListener("pointercancel",this.onPointerUp,!0),window.removeEventListener("wheel",this.onWheel,!0),window.removeEventListener("resize",this.resize)}}const Sc=window.AudioContext||window.webkitAudioContext,z_=Object.freeze({ash:4,attack:5,bodyImpact:5,bombExplosion:1,crossbowFire:3,click:2,deniedPurchase:1,gameOver:1,endgameBang:1,purchase:2,soulBling:3,soulCollect:5,waveStart:1,whoosh:3}),V_=Object.freeze({ash:.045,attack:.055,bodyImpact:.035,bombExplosion:.2,crossbowFire:.04,click:.025,deniedPurchase:.12,gameOver:.2,endgameBang:.5,purchase:.08,soulBling:.08,soulCollect:.035,waveStart:.2,whoosh:.025});class W_{constructor(t){this.files=t,this.context=Sc?new Sc:null,this.buffers=new Map,this.failed=new Set,this.activeCounts=new Map,this.lastPlayedAt=new Map,this.music=null,this.musicKey=null,this.musicGeneration=0,this.loops=new Map,this.context&&(this.masterGain=this.context.createGain(),this.sfxGain=this.context.createGain(),this.musicGain=this.context.createGain(),this.masterGain.gain.value=.92,this.sfxGain.gain.value=.95,this.musicGain.gain.value=.34,this.sfxGain.connect(this.masterGain),this.musicGain.connect(this.masterGain),this.masterGain.connect(this.context.destination))}async loadAll(t=null){if(!this.context)return;const e=Object.entries(this.files);let n=0;await Promise.all(e.map(async([i,s])=>{try{const a=await fetch(s);if(!a.ok)throw new Error(`${a.status} ${a.statusText}`);const o=await a.arrayBuffer(),l=await this.context.decodeAudioData(o.slice(0));this.buffers.set(i,l)}catch(a){this.failed.add(i),console.warn(`Audio file could not be loaded: ${s}`,a)}finally{n+=1,t?.(n/Math.max(e.length,1),i)}}))}async unlock(){if(!this.context)return!1;if(this.context.state!=="running")try{await this.context.resume()}catch(t){return console.warn("Audio could not be resumed.",t),!1}return this.context.state==="running"}randomBetween(t,e){return t+Math.random()*(e-t)}prime(t,{music:e=!1}={}){if(!this.context||this.context.state!=="running")return!1;const n=this.buffers.get(t);if(!n)return!1;const i=this.context.createBufferSource(),s=this.context.createGain();i.buffer=n,s.gain.value=1e-6,i.connect(s),s.connect(e?this.musicGain:this.sfxGain);const a=this.context.currentTime,o=Math.max(.008,Math.min(.025,n.duration||.02));return i.start(a,0,o),i.addEventListener("ended",()=>{try{i.disconnect()}catch{}try{s.disconnect()}catch{}},{once:!0}),!0}primeAllPlaybackPaths(){const t=new Set(["background1","background2","newDawn"]);for(const e of this.buffers.keys())this.prime(e,{music:t.has(e)})}getDuration(t){return Math.max(0,this.buffers.get(t)?.duration??0)}play(t,{volume:e=1,rate:n=null,pitchMin:i=1,pitchMax:s=1,cooldown:a=V_[t]??0,maxInstances:o=z_[t]??4}={}){if(!this.context||this.context.state!=="running")return null;const l=this.buffers.get(t);if(!l)return null;const c=this.context.currentTime,h=this.lastPlayedAt.get(t)??-1/0;if(c-h<a)return null;const u=this.activeCounts.get(t)??0;if(u>=o)return null;const d=this.context.createBufferSource(),f=this.context.createGain();return d.buffer=l,d.playbackRate.value=n??this.randomBetween(i,s),f.gain.value=Math.max(0,e),d.connect(f),f.connect(this.sfxGain),this.lastPlayedAt.set(t,c),this.activeCounts.set(t,u+1),d.addEventListener("ended",()=>{d.disconnect(),f.disconnect(),this.activeCounts.set(t,Math.max(0,(this.activeCounts.get(t)??1)-1))},{once:!0}),d.start(),d}playBodyImpact(t=8){const e=Math.min(Math.max(t/15,0),1);return this.play("bodyImpact",{volume:(.48+e*.42)*.6,pitchMin:.82,pitchMax:1.18})}playThrow(t=12){const e=Math.min(Math.max(t/38,0),1),n=.84+e*.27;return this.play("whoosh",{volume:.54+e*.3,rate:n*this.randomBetween(.96,1.04)})}playMusic(t,e=.8,n=!0){if(!this.context||this.context.state!=="running")return;const i=this.buffers.get(t);if(!i||this.musicKey===t)return;const s=this.context.currentTime,a=++this.musicGeneration,o=this.music,l=this.context.createBufferSource(),c=this.context.createGain();if(l.buffer=i,l.loop=n,c.gain.setValueAtTime(1e-4,s),c.gain.exponentialRampToValueAtTime(1,s+Math.max(e,.05)),l.connect(c),c.connect(this.musicGain),l.start(s),this.music={source:l,gain:c,generation:a},this.musicKey=t,l.addEventListener("ended",()=>{this.music?.generation===a&&(this.music=null,this.musicKey=null);try{l.disconnect()}catch{}try{c.disconnect()}catch{}},{once:!0}),o){const h=Math.max(o.gain.gain.value,1e-4);o.gain.gain.cancelScheduledValues(s),o.gain.gain.setValueAtTime(h,s),o.gain.gain.exponentialRampToValueAtTime(1e-4,s+Math.max(e,.05)),window.setTimeout(()=>{try{o.source.stop()}catch{}o.source.disconnect(),o.gain.disconnect()},Math.ceil((e+.1)*1e3))}}playLoop(t,e=t,{volume:n=.5,fadeSeconds:i=.2}={}){if(!this.context||this.context.state!=="running")return null;if(this.loops.has(e))return this.loops.get(e);const s=this.buffers.get(t);if(!s)return null;const a=this.context.currentTime,o=this.context.createBufferSource(),l=this.context.createGain();o.buffer=s,o.loop=!0,l.gain.setValueAtTime(1e-4,a),l.gain.exponentialRampToValueAtTime(Math.max(1e-4,n),a+Math.max(.05,i)),o.connect(l),l.connect(this.sfxGain),o.start(a);const c={source:o,gain:l,key:t,tag:e};return this.loops.set(e,c),c}stopLoop(t,e=.25){if(!this.context)return;const n=this.loops.get(t);if(!n)return;this.loops.delete(t);const i=this.context.currentTime;n.gain.gain.cancelScheduledValues(i),n.gain.gain.setValueAtTime(Math.max(n.gain.gain.value,1e-4),i),n.gain.gain.exponentialRampToValueAtTime(1e-4,i+Math.max(.05,e)),window.setTimeout(()=>{try{n.source.stop()}catch{}try{n.source.disconnect()}catch{}try{n.gain.disconnect()}catch{}},Math.ceil((e+.08)*1e3))}setMusicLevel(t,e=.35){if(!this.context||!this.musicGain)return;const n=this.context.currentTime;this.musicGain.gain.cancelScheduledValues(n),this.musicGain.gain.setValueAtTime(this.musicGain.gain.value,n),this.musicGain.gain.linearRampToValueAtTime(Math.max(0,t),n+Math.max(e,.01))}stopMusic(t=.8){if(!this.context||!this.music)return;const e=this.music,n=this.context.currentTime;this.music=null,this.musicKey=null,this.musicGeneration+=1,e.gain.gain.cancelScheduledValues(n),e.gain.gain.setValueAtTime(Math.max(e.gain.gain.value,1e-4),n),e.gain.gain.exponentialRampToValueAtTime(1e-4,n+Math.max(t,.05)),window.setTimeout(()=>{try{e.source.stop()}catch{}e.source.disconnect(),e.gain.disconnect()},Math.ceil((t+.1)*1e3))}dispose(){for(const t of[...this.loops.keys()])this.stopLoop(t,.05);this.stopMusic(.05),this.context&&this.context.state!=="closed"&&this.context.close().catch(()=>{})}}class X_{constructor(t){this.scene=t,this.active=!1,this.finished=!1,this.age=0,this.duration=1.05,this.start=new A,this.target=new A,this.onComplete=null,this.group=new se,this.group.visible=!1,this.scene.add(this.group),this.coreGeometry=new As(.17,1),this.coreMaterial=new ae({color:16751181,transparent:!0,opacity:.96,blending:he,depthWrite:!1}),this.core=new wt(this.coreGeometry,this.coreMaterial),this.group.add(this.core),this.haloGeometry=new Dr(.31,10,8),this.haloMaterial=new ae({color:16731666,transparent:!0,opacity:.24,blending:he,depthWrite:!1}),this.halo=new wt(this.haloGeometry,this.haloMaterial),this.group.add(this.halo)}startEffect(t,e,n=null,i=1){return this.active=!0,this.finished=!1,this.age=0,this.start.copy(t),this.target.copy(e),this.onComplete=n,this.group.position.copy(t),this.group.visible=!0,this.group.scale.setScalar(i),this}update(t){if(!this.active)return;this.age+=t;const e=Q.clamp(this.age/this.duration,0,1),n=e*e*(3-2*e);this.group.position.lerpVectors(this.start,this.target,n),this.group.position.y+=Math.sin(e*Math.PI)*3.1,this.group.position.z+=Math.sin(e*Math.PI*2)*.28;const i=1+Math.sin(this.age*19)*.13;if(this.core.scale.setScalar(i),this.halo.scale.setScalar(1.1+i*.22),this.haloMaterial.opacity=.18+i*.07,e>=1){this.active=!1,this.finished=!0,this.group.visible=!1;const s=this.onComplete;this.onComplete=null,s?.()}}dispose(){this.scene.remove(this.group),this.coreGeometry.dispose(),this.coreMaterial.dispose(),this.haloGeometry.dispose(),this.haloMaterial.dispose()}}class Y_{constructor(t,e=64){this.scene=t,this.count=e,this.active=!1,this.finished=!1,this.age=0,this.life=1.05,this.positions=new Float32Array(e*3),this.velocities=new Float32Array(e*3),this.geometry=new de,this.geometry.setAttribute("position",new ge(this.positions,3)),this.material=new Gn({color:2169368,size:.32,transparent:!0,opacity:0,depthWrite:!1,sizeAttenuation:!0}),this.points=new ri(this.geometry,this.material),this.points.visible=!1,this.scene.add(this.points)}startEffect(t,e=!1,n=1){this.active=!0,this.finished=!1,this.age=0,this.material.color.setHex(e?8006162:2169368),this.material.size=(e?.38:.32)*n,this.material.opacity=.92;for(let i=0;i<this.count;i+=1){const s=i*3;this.positions[s]=t.x,this.positions[s+1]=t.y,this.positions[s+2]=t.z,this.velocities[s]=Q.randFloatSpread((e?7.5:5.2)*n),this.velocities[s+1]=Q.randFloat(1.1*n,(e?8.2:6.6)*n),this.velocities[s+2]=Q.randFloatSpread((e?5.8:4.2)*n)}return this.geometry.attributes.position.needsUpdate=!0,this.points.visible=!0,this}update(t){if(!this.active)return;this.age+=t;const e=this.geometry.attributes.position.array;for(let n=0;n<this.count;n+=1){const i=n*3;this.velocities[i+1]-=8.4*t;const s=Math.pow(.985,t*60);this.velocities[i]*=s,this.velocities[i+1]*=s,this.velocities[i+2]*=s,e[i]+=this.velocities[i]*t,e[i+1]+=this.velocities[i+1]*t,e[i+2]+=this.velocities[i+2]*t}this.geometry.attributes.position.needsUpdate=!0,this.material.opacity=Math.max(0,.92*(1-this.age/this.life)),this.age>=this.life&&(this.active=!1,this.finished=!0,this.points.visible=!1)}dispose(){this.scene.remove(this.points),this.geometry.dispose(),this.material.dispose()}}class q_{constructor(t){this.scene=t,this.active=!1,this.finished=!1,this.age=0,this.life=.34,this.strength=8,this.geometry=new Ps(.28,.42,24),this.material=new ae({color:16742964,transparent:!0,opacity:0,side:xe,depthWrite:!1}),this.mesh=new wt(this.geometry,this.material),this.mesh.rotation.x=-Math.PI/2,this.mesh.visible=!1,this.scene.add(this.mesh)}startEffect(t,e=8,n=16742964){return this.active=!0,this.finished=!1,this.age=0,this.strength=e,this.material.color.setHex(n),this.material.opacity=.58,this.mesh.position.copy(t).setY(.05),this.mesh.scale.setScalar(1),this.mesh.visible=!0,this}update(t){if(!this.active)return;this.age+=t;const e=Math.min(this.age/this.life,1);this.mesh.scale.setScalar(1+e*this.strength*.22),this.material.opacity=(1-e)*.58,e>=1&&(this.active=!1,this.finished=!0,this.mesh.visible=!1)}dispose(){this.scene.remove(this.mesh),this.geometry.dispose(),this.material.dispose()}}class K_{constructor(t,e=32){this.scene=t,this.souls=Array.from({length:e},()=>new X_(t)),this.ashes=Array.from({length:e},()=>new Y_(t)),this.rings=Array.from({length:Math.max(16,Math.ceil(e*.75))},()=>new q_(t))}getFree(t){return t.find(e=>!e.active)??t[0]}soul(t,e,n=null,i=1){return this.getFree(this.souls).startEffect(t,e,n,i)}ash(t,e=!1,n=1){return this.getFree(this.ashes).startEffect(t,e,n)}ring(t,e=8,n=16742964){return this.getFree(this.rings).startEffect(t,e,n)}update(t){this.souls.forEach(e=>e.update(t)),this.ashes.forEach(e=>e.update(t)),this.rings.forEach(e=>e.update(t))}preWarm(){this.souls.forEach((t,e)=>{const n=-16+e%9*4,i=-4+e%5*2;t.startEffect(new A(n,1.2,i),new A(n+1.5,3,i))}),this.ashes.forEach((t,e)=>{const n=-15+e%8*4,i=-3.5+e%4*2.2;t.startEffect(new A(n,.8,i),e%2===0)}),this.rings.forEach((t,e)=>{const n=-14+e%8*4,i=-3+e%4*2;t.startEffect(new A(n,.05,i),8+e%4,e%2?16742964:16726802)})}finishPreWarm(){this.souls.forEach(t=>{t.active=!1,t.finished=!1,t.group.visible=!1,t.onComplete=null}),this.ashes.forEach(t=>{t.active=!1,t.finished=!1,t.points.visible=!1,t.material.opacity=0}),this.rings.forEach(t=>{t.active=!1,t.finished=!1,t.mesh.visible=!1,t.material.opacity=0})}dispose(){this.souls.forEach(t=>t.dispose()),this.ashes.forEach(t=>t.dispose()),this.rings.forEach(t=>t.dispose())}}const Ta="hellgate-manor-save-v3",bc="hellgate-manor-meta-v1",j_="b9520238793370c7fb9cb3bd76eaf0ffa8442359343c64b9c4082a662d2f62e7";class $_{constructor(t){this.container=t,this.clock=new C0,this.running=!1,this.gameplayActive=!1,this.paused=!1,this.startingGame=!1,this.cameraShake=0,this.cameraBase=new A(...$.camera.position),this.cameraTarget=new A(...$.camera.target);const e=new URLSearchParams(window.location.search);this.developerMode=!1,this.developerAccessGranted=!1,this.developerAccessPending=!1,this.developerWave=Q.clamp(Math.floor(Number(e.get("wave"))||1),1,$.waves.length),this.developerShop=!1,this.developerPanelOpen=!1,this.developerPanelPreviousMode="start",this.developerPanelPreviousPaused=!1,this.meta=this.readMeta(),this.endingActive=!1,this.endingTimer=0,this.endingDawnMusicStarted=!1,this.endingDawnMusicDelay=4.15,this.runtimePrimed=!1,this.mobileOptimized=(window.matchMedia?.("(pointer: coarse)")?.matches||navigator.maxTouchPoints>0)&&Math.min(window.innerWidth,window.innerHeight)<=900,this.scene=new zg,this.scene.background=new yt(329225),this.scene.fog=new Oo(526605,.018),this.camera=new Le($.camera.fov,window.innerWidth/window.innerHeight,.1,180),this.applyResponsiveCamera(!0),this.renderer=new Hg({antialias:!0,powerPreference:"high-performance"}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.mobileOptimized?1.35:2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=wc,this.renderer.outputColorSpace=fe,this.renderer.toneMapping=Tc,this.renderer.toneMappingExposure=1.15,this.container.appendChild(this.renderer.domElement),this.assets=new oi,this.audio=new W_($.sounds),this.loadingElement=document.getElementById("loading"),this.loadingProgress=document.getElementById("loading-progress"),this.loadingPercent=document.getElementById("loading-percent"),this.ui=new H_(document.getElementById("ui-canvas"),{onUIClick:()=>this.playUIClick(),onNewGame:()=>this.beginNewGame(),onNewGamePlus:()=>this.beginNewGamePlus(),onContinueSave:()=>this.continueSavedGame(),onBomb:()=>this.useBomb(),onPause:()=>this.togglePause(),onPurchase:n=>this.purchase(n),onAssign:(n,i)=>this.assignBoundSoul(n,i),onDeniedPurchase:()=>this.playDeniedPurchase(),onResultsContinue:()=>this.openIntermission(),onSave:()=>this.manualSave(),onContinue:()=>this.continueAfterIntermission(),onRetry:()=>this.retryWave(),onRestart:()=>this.beginNewGame(),onDevWaveChange:n=>this.changeDeveloperWave(n),onDevStartWave:()=>this.startDeveloperWave(),onDevOpenShop:()=>this.openDeveloperShop(),onDevAddSouls:n=>this.addDeveloperSouls(n),onDevAddBound:n=>this.addDeveloperBoundSouls(n),onDevUnlock:n=>this.unlockDeveloperSystem(n),onDevDawn:()=>this.testDeveloperDawn(),onDevToggleNGPlus:()=>this.toggleDeveloperNewGamePlus(),onDevClose:()=>this.closeDeveloperPanel()}),this.ui.setDeveloperMode(this.developerMode,this.developerWave,this.developerShop),this.ui.setMeta(this.meta),this.resetState({newGamePlus:!1}),this.onResize=this.onResize.bind(this),this.onKeyDown=this.onKeyDown.bind(this),this.animate=this.animate.bind(this),window.addEventListener("resize",this.onResize),window.addEventListener("keydown",this.onKeyDown)}resetState({newGamePlus:t=!1}={}){this.newGamePlus=!!t,this.waveIndex=0,this.souls=0,this.manorHealth=$.manor.startHealth,this.manorMaxHealth=$.manor.maxHealth,this.demonDeaths=0,this.boundSouls=0,this.bombs=0,this.fortifyLevel=0,this.extractionLevel=0,this.buildings={extraction:!1,hellfire:!1,demolition:!1,undercroft:!1,occult:!1},this.assignments={hellfire:0,demolition:0,undercroft:0,occult:0},this.waveStartSnapshot=null,this.continuesUsed=0,this.totalManorDamageTaken=0,this.endingActive=!1,this.endingTimer=0,this.endingDawnMusicStarted=!1,this.endingDawnMusicDelay=4.15,this.paused=!1}async start(){this.setLoadingProgress(3),await this.ui.preloadVisualAssets(),this.setLoadingProgress(5);try{await document.fonts?.load('32px "Lansbury"')}catch(t){console.warn("Lansbury font could not be preloaded.",t)}this.setLoadingProgress(8),await this.audio.loadAll(t=>this.setLoadingProgress(8+t*18)),this.setLoadingProgress(28),await this.assets.loadAll(t=>{this.setLoadingProgress(28+t*15)}),this.setLoadingProgress(43),this.world=new U_(this.scene,this.assets,{mobile:this.mobileOptimized}),await this.world.load(),this.world.setNewGamePlusMode?.(!1),this.setLoadingProgress(50),this.effectPool=new K_(this.scene,$.pool.effects),this.waveManager=new B_({scene:this.scene,assets:this.assets,camera:this.camera,onEnemyDeath:t=>this.handleEnemyDeath(t),onEnemyAttack:t=>this.handleManorAttack(t),onEnemyImpact:t=>this.handleEnemyImpact(t),onEnemyExtracted:t=>this.handleEnemyExtracted(t),onWaveComplete:()=>this.handleWaveComplete(),onSiegeClick:t=>this.handleSiegeClick(t)}),await this.waveManager.preparePools(t=>this.setLoadingProgress(52+t*23)),this.grabSystem=new F_({camera:this.camera,domElement:this.renderer.domElement,getEnemies:()=>this.waveManager.getAliveEnemies(),onRelease:t=>this.handleRelease(t),onDirectClick:t=>this.handleSiegeClick(t)}),this.defence=new G_(this.scene,this.world,()=>this.waveManager.getActiveCombatEnemies(),(t,e,n)=>this.damageEnemy(t,e,n),t=>this.grabSystem?.isHolding(t)??!1,()=>this.audio.play("crossbowFire",{volume:.68,pitchMin:.93,pitchMax:1.08}),()=>this.cameraShake=Math.max(this.cameraShake,.06)),this.setLoadingProgress(78),await this.preWarmEverything(),this.applyUpgradeState(),this.syncUI(),this.ui.setMeta(this.meta),this.ui.setHasSave(this.developerMode?!1:this.hasSave()),this.ui.setMode("start"),this.running=!0,requestAnimationFrame(this.animate),this.setLoadingProgress(100),await this.waitForFrame(),await new Promise(t=>window.setTimeout(t,180)),this.loadingElement.classList.add("hidden"),window.setTimeout(()=>this.loadingElement.remove(),650)}setLoadingProgress(t){const e=Q.clamp(t,0,100);this.loadingProgress&&(this.loadingProgress.style.width=`${e}%`),this.loadingPercent&&(this.loadingPercent.textContent=`${Math.round(e)}%`)}waitForFrame(){return new Promise(t=>requestAnimationFrame(t))}async preWarmEverything(){const t=this.waveManager.getAllPooledEnemies();this.effectPool.preWarm(),this.defence.preWarm(),this.world.setUpgradeState({extraction:!0,extractionLevel:3,demolition:!0,undercroft:!0,occult:!0,fortifyLevel:10}),this.world.setTurretLevel(3),this.world.setNewGamePlusMode?.(!0),this.world.prepareDawnAssets?.(),this.world.setDawnPrewarmVisible?.(!0);for(let i=0;i<$.extraction.maxConcurrent;i+=1)this.world.startExtractionBeam?.($.extraction.maxConcurrent);this.world.triggerOccultStrike?.(new A(-8,0,-2)),this.world.triggerOccultStrike?.(new A(-2,0,1)),this.world.triggerOccultStrike?.(new A(5,0,3)),this.world.triggerManorDamageDust?.(new A(this.world.manorBarrierX,0,-3),"husk"),this.world.triggerManorDamageDust?.(new A(this.world.manorBarrierX,0,0),"brute"),this.world.triggerManorDamageDust?.(new A(this.world.manorBarrierX,0,3),"siege");const e=8;let n=0;for(let i=0;i<t.length;i+=e){const s=t.slice(i,i+e);s.forEach((a,o)=>{const l=o%4,c=Math.floor(o/4);a.resetForSpawn(-(i+o+1),new A(-12+l*7,0,-3+c*5.5)),a.preWarmAllActions()});for(let a=0;a<2;a+=1){const o=.03333333333333333;s.forEach(l=>l.update(o,a*o,!1,this.world.manorBarrierX)),this.effectPool.update(o),this.defence.updateProjectiles(o),this.defence.updateImpacts(o),this.world.update((i+a)*o,o),this.renderer.render(this.scene,this.camera),await this.waitForFrame()}s.forEach(a=>a.deactivateForPool()),n+=s.length,this.setLoadingProgress(78+n/Math.max(t.length,1)*13)}this.setLoadingProgress(92);for(let i=0;i<12;i+=1){const s=.03333333333333333;this.effectPool.update(s),this.defence.updateProjectiles(s),this.defence.updateImpacts(s),this.world.update(i*s,s),this.renderer.render(this.scene,this.camera),await this.waitForFrame()}this.setLoadingProgress(96),typeof this.renderer.compileAsync=="function"?await this.renderer.compileAsync(this.scene,this.camera):this.renderer.compile(this.scene,this.camera),this.effectPool.finishPreWarm(),this.waveManager.pooledEnemies=new Set(Object.values(this.waveManager.pools).flat()),this.defence.projectiles.slice().forEach(i=>this.defence.releaseArrow(i)),this.defence.impacts.slice().forEach(i=>{i.active=!1,i.mesh.visible=!1}),this.defence.impacts=[],this.world.setTurretLevel(0),this.world.resetTransientEffects?.(),this.world.setNewGamePlusMode?.(!1),this.applyUpgradeState(),this.renderer.render(this.scene,this.camera),this.setLoadingProgress(98),await this.waitForFrame()}async playUIClick(){await this.audio.unlock(),this.audio.play("click",{volume:.34,pitchMin:.97,pitchMax:1.04,cooldown:.02,maxInstances:2})}async primeRuntimeAfterUnlock(){this.runtimePrimed||(this.runtimePrimed=!0,await this.audio.unlock(),this.audio.primeAllPlaybackPaths?.(),await this.waitForFrame())}async beginNewGame(){return this.beginFreshGame(!1)}async beginNewGamePlus(){if(!(!this.meta.ngPlusUnlocked&&!this.developerMode))return this.beginFreshGame(!0)}async beginFreshGame(t=!1){if(!this.startingGame){if(this.startingGame=!0,await this.audio.unlock(),await this.primeRuntimeAfterUnlock(),this.resetState({newGamePlus:t}),this.world.setNewGamePlusMode?.(this.newGamePlus),this.world.resetNight?.(),this.developerMode||this.clearSave(),this.developerMode&&(this.waveIndex=this.developerWave-1,this.souls=5e4,this.boundSouls=160,this.manorMaxHealth=5e3,this.manorHealth=5e3,this.developerShop)){this.gameplayActive=!1,this.grabSystem.setEnabled(!1),this.applyUpgradeState(),this.syncUI(),this.ui.setMode("intermission"),this.startingGame=!1;return}this.applyUpgradeState(),this.startCurrentWave(),this.startingGame=!1}}async continueSavedGame(){if(this.startingGame)return;this.startingGame=!0,await this.audio.unlock(),await this.primeRuntimeAfterUnlock();const t=this.readSave();if(!t)return this.startingGame=!1,this.beginNewGame();this.restoreState(t),this.world.setNewGamePlusMode?.(this.newGamePlus),this.world.resetNight?.(),this.applyUpgradeState(),this.startCurrentWave(),this.startingGame=!1}snapshotState(){return{waveIndex:this.waveIndex,souls:this.souls,manorHealth:this.manorHealth,manorMaxHealth:this.manorMaxHealth,demonDeaths:this.demonDeaths,boundSouls:this.boundSouls,bombs:this.bombs,fortifyLevel:this.fortifyLevel,extractionLevel:this.extractionLevel,continuesUsed:this.continuesUsed,totalManorDamageTaken:this.totalManorDamageTaken,newGamePlus:this.newGamePlus,buildings:{...this.buildings},assignments:{...this.assignments}}}restoreState(t){this.waveIndex=Q.clamp(Number(t.waveIndex)||0,0,$.waves.length-1),this.souls=Math.max(0,Number(t.souls)||0),this.manorHealth=Math.max(1,Number(t.manorHealth)||$.manor.startHealth);const e=$.manor.maxHealth+$.manor.maxFortifyLevel*$.manor.fortify.amount;this.manorMaxHealth=Q.clamp(Number(t.manorMaxHealth)||$.manor.maxHealth,$.manor.maxHealth,e),this.manorHealth=Math.min(this.manorHealth,this.manorMaxHealth),this.demonDeaths=Math.max(0,Number(t.demonDeaths)||0),this.boundSouls=Math.max(0,Number(t.boundSouls)||0),this.bombs=Q.clamp(Number(t.bombs)||0,0,$.defence.bombMaxCharges),this.fortifyLevel=Q.clamp(Number(t.fortifyLevel)||0,0,$.manor.maxFortifyLevel),this.extractionLevel=Q.clamp(Number(t.extractionLevel)||(t.buildings?.extraction?1:0),0,$.extraction.maxLevel),this.continuesUsed=Q.clamp(Number(t.continuesUsed)||0,0,3),this.totalManorDamageTaken=Math.max(0,Number(t.totalManorDamageTaken)||0),this.newGamePlus=!!t.newGamePlus,this.buildings={...this.buildings,...t.buildings??{}},this.assignments={...this.assignments,...t.assignments??{}},this.normaliseAssignments()}readMeta(){try{const t=localStorage.getItem(bc),e=t?JSON.parse(t):{};return{ngPlusUnlocked:!!e.ngPlusUnlocked,bestRank:e.bestRank??null,bestStars:e.bestStars??null}}catch{return{ngPlusUnlocked:!1,bestRank:null,bestStars:null}}}saveMeta(){try{localStorage.setItem(bc,JSON.stringify(this.meta))}catch{}this.ui?.setMeta(this.meta)}rankValue(t){return{D:1,C:2,B:3,A:4,S:5}[t]??0}recordCompletion(t){this.developerMode||(this.meta.ngPlusUnlocked=!0,(!this.meta.bestRank||this.rankValue(t.finalRank)>this.rankValue(this.meta.bestRank))&&(this.meta.bestRank=t.finalRank,this.meta.bestStars={survival:t.survival.stars,defence:t.defence.stars,binding:t.binding.stars}),this.saveMeta())}hasSave(){return!!this.readSave()}readSave(){try{const t=localStorage.getItem(Ta);return t?JSON.parse(t):null}catch{return null}}saveGame(t=this.waveIndex){if(this.developerMode)return!0;try{const e=this.snapshotState();return e.waveIndex=Q.clamp(t,0,$.waves.length-1),localStorage.setItem(Ta,JSON.stringify(e)),this.ui.setHasSave(!0),!0}catch(e){return console.warn("Save could not be written.",e),!1}}clearSave(){if(!this.developerMode){try{localStorage.removeItem(Ta)}catch{}this.ui.setHasSave(!1)}}startCurrentWave(){this.gameplayActive=!0,this.paused=!1,this.grabSystem.setEnabled(!0),this.bombs=this.buildings.demolition?Math.min($.defence.bombMaxCharges,Math.floor((this.assignments.demolition??0)/$.defence.bombSoulsPerCharge)):0,this.waveStartSnapshot=this.snapshotState(),this.waveManager.setNewGamePlus?.(this.newGamePlus),this.waveManager.startWave(this.waveIndex),this.defence.resetCooldown(),this.audio.setMusicLevel(.34,.3),this.audio.playMusic(this.waveIndex%2===0?"background1":"background2",.7),this.audio.play("waveStart",{volume:.72,pitchMin:.97,pitchMax:1.03}),this.ui.setMode("playing"),this.ui.showBanner(`WAVE ${this.waveIndex+1}`,this.newGamePlus?"NEW GAME+ — HELL HAS RETURNED":this.waveIndex===0?"THE FIRST DEMONS ARE COMING":"DEFEND THE MANOR",2.6),this.saveGame(this.waveIndex),this.syncUI()}handleRelease({enemy:t,velocity:e}){return this.buildings.extraction&&this.extractionLevel>0&&t.convertible&&this.world.isInsideExtractionZone(t.position)&&this.world.startExtractionBeam(this.extractionLevel)>=0&&this.waveManager.captureEnemy(t)?(this.boundSouls+=1,this.ui.pulseBound(),this.audio.play("soulBling",{volume:.62,pitchMin:.98,pitchMax:1.03}),this.audio.playLoop("soulBinding","soul-binding",{volume:.34,fadeSeconds:.25}),this.normaliseAssignments(),this.applyUpgradeState(),this.syncUI(),!0):(this.audio.playThrow(e.length()),!1)}handleEnemyExtracted(){}handleEnemyDeath({enemy:t,position:e,impactStrength:n=9,reason:i}){if(!t)return;const s=this.newGamePlus?$.newGamePlus.soulRewardMultiplier:1;this.souls+=Math.max(1,Math.round(t.soulValue*s)),this.demonDeaths+=1;const a=t.type==="siege"?2.15:t.type==="brute"?1.45:1,o=this.projectWorldToScreen(e);this.ui.addSoulFlight(o.x,o.y,()=>{this.audio.play("soulCollect",{volume:.58,pitchMin:.9,pitchMax:1.12})},a),this.effectPool.ash(e,i==="bomb"||i==="occult"||t.type==="siege",a),this.effectPool.ring(e.clone().setY(.04),n*Math.min(a,1.7),i==="occult"?11894015:i==="bomb"?16726802:16742964),this.audio.play("ash",{volume:i==="bomb"?.42:t.type==="siege"?.7:.58,pitchMin:t.type==="siege"?.72:.84,pitchMax:t.type==="siege"?.9:1.16}),this.cameraShake=Math.max(this.cameraShake,t.type==="siege"?.34:i==="bomb"?.3:.18),this.syncUI()}handleEnemyImpact({impactStrength:t=8}={}){this.audio.playBodyImpact(t)}damageEnemy(t,e,n=1){!t||t.dead||t.removed||t.applyDamage(n,e,e==="bomb"?15:11)}handleSiegeClick(t){if(!this.gameplayActive||!t?.canDirectClick?.())return;t.staggerSiege(1)&&(this.audio.playBodyImpact(9),this.cameraShake=Math.max(this.cameraShake,.08))}handleManorAttack(t){if(!this.gameplayActive||this.manorHealth<=0||!t||t.dead)return;const e=Math.min(this.manorHealth,t.attackDamage);this.manorHealth=Math.max(0,this.manorHealth-t.attackDamage),this.totalManorDamageTaken+=e,this.world.triggerManorDamageDust?.(t.position,t.type),this.audio.play("attack",{volume:t.type==="siege"?.78:t.type==="brute"?.7:.58,pitchMin:t.type==="runner"?1.02:.86,pitchMax:t.type==="runner"?1.16:1.05}),this.ui.flashHealth(),this.cameraShake=Math.max(this.cameraShake,t.type==="siege"?.22:.07),this.syncUI(),this.manorHealth<=0&&this.failWave()}handleWaveComplete(){if(!this.gameplayActive)return;this.gameplayActive=!1,this.grabSystem.setEnabled(!1),this.audio.setMusicLevel(.22,.45);const t=this.waveStartSnapshot??this.snapshotState(),e=Math.max(0,this.souls-(t.souls??0)),n=Math.max(0,this.demonDeaths-(t.demonDeaths??0)),i=Math.max(0,(t.manorHealth??this.manorHealth)-this.manorHealth);if(this.buildings.undercroft&&this.assignments.undercroft>0){const a=this.assignments.undercroft*6;this.manorHealth=Math.min(this.manorMaxHealth,this.manorHealth+a)}if(this.syncUI(),this.waveIndex>=$.waves.length-1){this.beginVictorySequence();return}const s=this.saveGame(this.waveIndex+1);this.ui.setWaveResults({souls:e,deaths:n,damage:i,health:this.manorHealth,maxHealth:this.manorMaxHealth,saved:s}),this.ui.setMode("results")}calculateEndingResult(){const t=this.continuesUsed===0?5:this.continuesUsed===1?4:this.continuesUsed===2?3:2,e=this.newGamePlus?$.ranking.newGamePlusDefenceScale:1,[n,i,s,a]=$.ranking.defenceDamageThresholds.map(g=>g*e),o=this.totalManorDamageTaken<=n?5:this.totalManorDamageTaken<=i?4:this.totalManorDamageTaken<=s?3:this.totalManorDamageTaken<=a?2:1,l=$.ranking.bindingMaxTarget,c=this.boundSouls/Math.max(1,l),h=c>=1?5:c>=.8?4:c>=.6?3:c>=.4?2:1,u=t+o+h,d=u/3,f=u>=14?"S":u>=12?"A":u>=9?"B":u>=6?"C":"D";return{newGamePlus:this.newGamePlus,finalRank:f,average:d,demonDeaths:this.demonDeaths,boundSouls:this.boundSouls,survival:{stars:t,detail:`${this.continuesUsed} CONTINUE${this.continuesUsed===1?"":"S"} USED`},defence:{stars:o,detail:`${Math.round(this.totalManorDamageTaken)} TOTAL MANOR DAMAGE`},binding:{stars:h,detail:`${this.boundSouls} / ${l} BOUND SOULS`}}}beginVictorySequence(){const t=this.calculateEndingResult();this.recordCompletion(t),this.clearSave(),this.gameplayActive=!1,this.paused=!1,this.endingActive=!0,this.endingTimer=0,this.endingDawnMusicStarted=!1,this.grabSystem?.setEnabled(!1),this.audio.stopLoop("soul-binding",.35),this.audio.stopMusic(.45),this.audio.play("endgameBang",{volume:.96,rate:1,cooldown:0,maxInstances:1});const e=this.audio.getDuration?.("endgameBang")??0;this.endingDawnMusicDelay=Math.max(4.15,e+.18),this.defence.clearForDawn?.(),this.world.startVictorySequence?.(),this.ui.startEndingSequence(t)}openIntermission(){this.ui.mode==="results"&&(this.ui.setMode("intermission"),this.syncUI())}manualSave(){if(this.ui.mode!=="intermission")return;const t=this.saveGame(this.waveIndex+1);this.ui.showSaveNotice(t)}getFortifyCost(){return $.helpers.round10($.manor.fortify.baseCost*Math.pow(1.18,this.fortifyLevel))}getMajorFortifyCost(){const t=Math.floor(this.fortifyLevel/$.manor.majorFortify.levels);return $.helpers.round10($.manor.majorFortify.baseCost*Math.pow(2.15,t))}getPurchaseDefinition(t){const e=$.manor.repairs;return{repairMinor:e.minor.cost,repairMajor:e.major.cost,repairFull:e.full.cost,fortify:this.getFortifyCost(),majorFortify:this.getMajorFortifyCost(),extraction:$.buildings.extraction.cost,extractionUpgrade:this.extractionLevel===1?$.buildings.extractionUpgrade2.cost:this.extractionLevel===2?$.buildings.extractionUpgrade3.cost:null,hellfire:$.buildings.hellfire.cost,demolition:$.buildings.demolition.cost,undercroft:$.buildings.undercroft.cost,occult:$.buildings.occult.cost}[t]}getUnlockWave(t){return $.buildings[t]?.unlockWave??1}purchase(t){if(this.ui.mode!=="intermission")return;const e=this.getPurchaseDefinition(t);if(e==null||this.souls<e)return this.playDeniedPurchase();if(t.startsWith("repair")&&this.manorHealth>=this.manorMaxHealth)return this.playDeniedPurchase();if((t==="fortify"||t==="majorFortify")&&this.fortifyLevel>=$.manor.maxFortifyLevel)return this.playDeniedPurchase();if(t==="majorFortify"&&this.fortifyLevel+$.manor.majorFortify.levels>$.manor.maxFortifyLevel)return this.playDeniedPurchase();const n=t==="extractionUpgrade"?"extraction":t;if($.buildings[n]?.unlockWave&&this.waveIndex+1<this.getUnlockWave(n))return this.playDeniedPurchase();if(["hellfire","demolition","undercroft","occult"].includes(t)&&!this.buildings.extraction)return this.playDeniedPurchase();if(t!=="extractionUpgrade"&&this.buildings[t])return this.playDeniedPurchase();if(t==="extractionUpgrade"&&(!this.buildings.extraction||this.extractionLevel>=$.extraction.maxLevel))return this.playDeniedPurchase();this.souls-=e,t==="repairMinor"?this.manorHealth=Math.min(this.manorMaxHealth,this.manorHealth+$.manor.repairs.minor.amount):t==="repairMajor"?this.manorHealth=Math.min(this.manorMaxHealth,this.manorHealth+$.manor.repairs.major.amount):t==="repairFull"?this.manorHealth=Math.min(this.manorMaxHealth,this.manorHealth+$.manor.repairs.full.amount):t==="fortify"?(this.manorMaxHealth+=$.manor.fortify.amount,this.manorHealth+=$.manor.fortify.amount,this.fortifyLevel+=1):t==="majorFortify"?(this.manorMaxHealth+=$.manor.majorFortify.amount,this.manorHealth+=$.manor.majorFortify.amount,this.fortifyLevel+=$.manor.majorFortify.levels):t==="extraction"?(this.buildings.extraction=!0,this.extractionLevel=1,this.ui.showExtractionTutorial()):t==="extractionUpgrade"?this.extractionLevel=Math.min($.extraction.maxLevel,this.extractionLevel+1):t in this.buildings&&(this.buildings[t]=!0),this.audio.play("purchase",{volume:.68,pitchMin:.96,pitchMax:1.05}),this.normaliseAssignments(),this.applyUpgradeState(),this.saveGame(this.waveIndex+1),this.syncUI()}playDeniedPurchase(){this.audio.play("deniedPurchase",{volume:.55,pitchMin:.97,pitchMax:1.03})}getUnassignedSouls(){return Math.max(0,this.boundSouls-Object.values(this.assignments).reduce((t,e)=>t+e,0))}normaliseAssignments(){const t=Object.keys(this.assignments);t.forEach(n=>{const i=$.boundCaps[n]??1/0;this.assignments[n]=Math.min(i,Math.max(0,Math.floor(Number(this.assignments[n])||0))),this.buildings[n]||(this.assignments[n]=0)});let e=Object.values(this.assignments).reduce((n,i)=>n+i,0);for(;e>this.boundSouls;){const n=t.find(i=>this.assignments[i]>0);if(!n)break;this.assignments[n]-=1,e-=1}}assignBoundSoul(t,e){if(!(this.ui.mode!=="intermission"||!this.buildings[t])){if(e>0){const n=$.boundCaps[t]??1/0;if((this.assignments[t]??0)>=n)return this.playDeniedPurchase();if(this.getUnassignedSouls()<=0)return this.playDeniedPurchase();this.assignments[t]+=1}else if(e<0){if((this.assignments[t]??0)<=0)return this.playDeniedPurchase();this.assignments[t]-=1}this.audio.play("purchase",{volume:.34,pitchMin:.98,pitchMax:1.05}),this.applyUpgradeState(),this.saveGame(this.waveIndex+1),this.syncUI()}}applyUpgradeState(){!this.world||!this.defence||(this.world.setUpgradeState({extraction:this.buildings.extraction,extractionLevel:this.extractionLevel,demolition:this.buildings.demolition,undercroft:this.buildings.undercroft,occult:this.buildings.occult,fortifyLevel:this.fortifyLevel}),this.defence.setHellfireSouls(this.buildings.hellfire?this.assignments.hellfire:0),this.defence.setOccultSouls(this.buildings.occult?this.assignments.occult:0))}continueAfterIntermission(){this.ui.mode==="intermission"&&(this.developerMode&&this.developerShop||(this.waveIndex+=1),this.developerShop=!1,this.startCurrentWave())}useBomb(){if(!this.gameplayActive||this.paused||this.bombs<=0)return;const t=[...this.waveManager.getActiveCombatEnemies()];t.length!==0&&(this.bombs-=1,this.audio.play("bombExplosion",{volume:.78,pitchMin:.96,pitchMax:1.04}),t.forEach(e=>{const n=e.type==="brute"||e.type==="siege"?1:e.durability;e.applyDamage(n,"bomb",15)}),this.cameraShake=Math.max(this.cameraShake,.42),this.syncUI())}failWave(){this.gameplayActive&&(this.paused=!1,this.gameplayActive=!1,this.grabSystem.setEnabled(!1),this.waveManager.stop(),this.audio.stopMusic(.45),this.audio.play("gameOver",{volume:.78}),this.ui.setContinueState({canRetry:this.continuesUsed<3,remaining:Math.max(0,3-this.continuesUsed)}),this.ui.setMode("gameOver"))}retryWave(){if(!this.waveStartSnapshot||this.continuesUsed>=3)return;const t=this.continuesUsed+1;this.waveManager.clear(),this.restoreState(this.waveStartSnapshot),this.continuesUsed=t,this.applyUpgradeState(),this.startCurrentWave()}checkWorldCollisions(){for(const t of this.waveManager.getAliveEnemies()){if(t.type!=="siege"&&t.state!=="grabbed"&&t.state!=="extracting"&&t.position.x>this.world.manorBounds.max.x+.6&&t.position.y<=1.8){t.position.set(this.world.manorBarrierX-.05,0,Q.clamp(t.position.z,-4.8,4.8)),t.group.rotation.set(0,0,0),t.modelRoot.rotation.set(0,0,0),t.velocity.set(0,0,0),t.state="walking",t.reachManor(this.world.manorBarrierX);continue}if(t.state==="walking"){t.type!=="siege"&&t.position.x>=this.world.manorBarrierX&&t.reachManor(this.world.manorBarrierX);continue}if(t.state!=="airborne")continue;const n=t.velocity.length();if(this.world.isInsideManorCollision(t.position)){n>=$.enemy.hardSurfaceKillSpeed?t.hitHardSurface("manor",n):(this.handleEnemyImpact({impactStrength:n}),t.position.x=this.world.manorBarrierX-.2,t.position.y=0,t.velocity.x=-Math.abs(t.velocity.x)*.3,t.knockDown(t.velocity));continue}this.world.findTreeCollision(t.position)&&(n>=$.enemy.treeKillSpeed?t.hitHardSurface("tree",n):(this.handleEnemyImpact({impactStrength:n}),t.position.y=0,t.velocity.x*=-.24,t.velocity.z*=-.24,t.knockDown(t.velocity)))}}checkEnemyCollisions(){}projectWorldToScreen(t){const e=t.clone().project(this.camera);return{x:(e.x*.5+.5)*window.innerWidth,y:(-e.y*.5+.5)*window.innerHeight}}onKeyDown(t){if(t.ctrlKey&&t.shiftKey&&!t.altKey&&t.key.toLowerCase()==="j"){if(t.preventDefault(),t.repeat||this.developerAccessPending)return;this.developerPanelOpen?this.closeDeveloperPanel():this.developerAccessGranted?this.openDeveloperPanel():this.requestDeveloperAccess();return}if(t.key==="Escape"){if(this.developerPanelOpen){t.preventDefault(),this.closeDeveloperPanel();return}this.ui.mode!=="playing"&&this.ui.mode!=="paused"||(t.preventDefault(),this.togglePause())}}async hashDeveloperPassword(t){const e=new TextEncoder().encode(t),n=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(n),i=>i.toString(16).padStart(2,"0")).join("")}async requestDeveloperAccess(){this.developerAccessPending=!0;try{const t=window.prompt("Developer access password:");if(t==null)return;if(await this.hashDeveloperPassword(t)!==j_){this.audio.play("deniedPurchase",{volume:.42,cooldown:0});return}this.developerAccessGranted=!0,this.openDeveloperPanel()}catch(t){console.warn("Developer access check failed.",t)}finally{this.developerAccessPending=!1}}openDeveloperPanel(){this.developerPanelOpen||(this.developerMode=!0,this.developerPanelOpen=!0,this.developerPanelPreviousMode=this.ui.mode,this.developerPanelPreviousPaused=this.paused,this.developerWave=this.waveIndex+1,this.gameplayActive&&(this.paused=!0,this.grabSystem?.setEnabled(!1),this.audio.setMusicLevel(.1,.15)),this.ui.setDeveloperMode(!0,this.developerWave,!1),this.ui.setDeveloperPanel(!0,this.developerWave))}closeDeveloperPanel(){if(!this.developerPanelOpen)return;this.developerPanelOpen=!1,this.ui.setDeveloperPanel(!1,this.developerWave);const t=this.developerPanelPreviousMode;this.gameplayActive&&t==="playing"?(this.paused=!1,this.grabSystem?.setEnabled(!0),this.audio.setMusicLevel(.34,.2),this.ui.setMode("playing")):this.gameplayActive&&t==="paused"?(this.paused=!0,this.ui.setMode("paused")):this.ui.setMode(t)}changeDeveloperWave(t){this.developerWave=Q.clamp(this.developerWave+t,1,$.waves.length),this.ui.setDeveloperPanel(!0,this.developerWave)}prepareDeveloperTransition(){this.developerMode=!0,this.developerPanelOpen=!1,this.ui.setDeveloperPanel(!1,this.developerWave),this.paused=!1,this.gameplayActive=!1,this.grabSystem?.setEnabled(!1),this.waveManager?.clear(),this.waveIndex=this.developerWave-1}startDeveloperWave(){this.prepareDeveloperTransition(),this.applyUpgradeState(),this.startCurrentWave()}openDeveloperShop(){this.prepareDeveloperTransition(),this.developerShop=!0,this.applyUpgradeState(),this.syncUI(),this.ui.setMode("intermission")}addDeveloperSouls(t){this.souls=Math.max(0,this.souls+t),this.syncUI()}addDeveloperBoundSouls(t){this.boundSouls=Math.max(0,this.boundSouls+t),this.normaliseAssignments(),this.applyUpgradeState(),this.syncUI()}unlockDeveloperSystem(t){t in this.buildings&&(this.buildings[t]=!0,t==="extraction"&&(this.extractionLevel=Math.max(1,this.extractionLevel)),this.applyUpgradeState(),this.syncUI())}testDeveloperDawn(){this.prepareDeveloperTransition(),this.demonDeaths=Math.max(this.demonDeaths,700),this.boundSouls=Math.max(this.boundSouls,$.ranking.bindingMaxTarget),this.totalManorDamageTaken=Math.max(this.totalManorDamageTaken,4200),this.beginVictorySequence()}toggleDeveloperNewGamePlus(){this.developerMode=!0,this.newGamePlus=!this.newGamePlus,this.waveManager?.setNewGamePlus?.(this.newGamePlus),this.world?.setNewGamePlusMode?.(this.newGamePlus),this.ui.setDeveloperPanel(!0,this.developerWave),this.syncUI()}togglePause(){this.gameplayActive&&(this.paused=!this.paused,this.paused?(this.grabSystem?.setEnabled(!1),this.audio.setMusicLevel(.12,.18),this.ui.setMode("paused")):(this.grabSystem?.setEnabled(!0),this.audio.setMusicLevel(.34,.22),this.ui.setMode("playing")))}syncUI(){this.ui.setHUD({wave:Math.min(this.waveIndex+1,$.waves.length),souls:this.souls,health:this.manorHealth,maxHealth:this.manorMaxHealth,deaths:this.demonDeaths,boundSouls:this.boundSouls,unassignedSouls:this.getUnassignedSouls(),bombs:this.bombs,fortifyLevel:this.fortifyLevel,extractionLevel:this.extractionLevel,buildings:{...this.buildings},assignments:{...this.assignments},purchaseCosts:{fortify:this.getFortifyCost(),majorFortify:this.getMajorFortifyCost(),extractionUpgrade:this.getPurchaseDefinition("extractionUpgrade")},newGamePlus:this.newGamePlus,totalManorDamageTaken:this.totalManorDamageTaken,unlockWaves:Object.fromEntries(Object.entries($.buildings).filter(([,t])=>t.unlockWave).map(([t,e])=>[t,e.unlockWave]))})}isMobileLandscapeView(){return!!this.mobileOptimized&&window.innerWidth>window.innerHeight&&window.innerHeight<=700}applyResponsiveCamera(t=!1){if(this.camera){if(this.isMobileLandscapeView()){const e=2.164102564102564,n=Q.degToRad(38.5),i=2*Math.atan(Math.tan(n/2)*e),s=Math.max(1.35,window.innerWidth/Math.max(window.innerHeight,1)),a=2*Math.atan(Math.tan(i/2)/s),o=Q.radToDeg(a),l=Q.radToDeg(n),c=s>e?Q.lerp(o,l,.25):o;this.camera.fov=Q.clamp(c,31.5,41.5),this.cameraBase.set(.2,8.75,24.4),this.cameraTarget.set(2.25,3,0)}else this.camera.fov=$.camera.fov,this.cameraBase.set(...$.camera.position),this.cameraTarget.set(...$.camera.target);this.camera.updateProjectionMatrix(),t&&this.camera.position.copy(this.cameraBase),this.camera.lookAt(this.cameraTarget)}}updateCamera(t){if(this.cameraShake=Math.max(0,this.cameraShake-t*1.9),this.cameraShake>0){const e=this.cameraShake;this.camera.position.set(this.cameraBase.x+Q.randFloatSpread(e),this.cameraBase.y+Q.randFloatSpread(e*.55),this.cameraBase.z+Q.randFloatSpread(e*.35))}else this.camera.position.lerp(this.cameraBase,.18);this.camera.lookAt(this.cameraTarget)}animate(){if(!this.running)return;requestAnimationFrame(this.animate);const t=Math.min(this.clock.getDelta(),1/30),e=this.clock.elapsedTime;this.ui.update(t),this.endingActive&&(this.endingTimer+=t,!this.endingDawnMusicStarted&&this.endingTimer>=this.endingDawnMusicDelay&&(this.endingDawnMusicStarted=!0,this.audio.playMusic("newDawn",1.4,!1)));const n=this.gameplayActive&&!this.paused;if(this.waveManager){this.waveManager.update(n?t:0);for(const s of this.waveManager.getAliveEnemies())s.update(n?t:0,e,this.grabSystem?.isHolding(s)??!1,this.world.manorBarrierX);n&&this.checkWorldCollisions()}this.grabSystem?.update(n?t:0),this.defence?.update(n?t:0,n),this.effectPool?.update(this.paused?0:t),this.world?.update(e,this.paused?0:t);const i=this.world?.consumeExtractionCompletions?.()??0;for(let s=0;s<i;s+=1)this.audio.play("soulBling",{volume:.68,pitchMin:1,pitchMax:1.05});(this.world?.getActiveExtractionCount?.()??0)<=0&&this.audio.stopLoop("soul-binding",.35),this.updateCamera(t),this.syncUI(),this.ui.draw(),this.renderer.render(this.scene,this.camera)}onResize(){this.mobileOptimized=(window.matchMedia?.("(pointer: coarse)")?.matches||navigator.maxTouchPoints>0)&&Math.min(window.innerWidth,window.innerHeight)<=900,this.camera.aspect=window.innerWidth/window.innerHeight,this.applyResponsiveCamera(!0),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.mobileOptimized?1.35:2)),this.renderer.setSize(window.innerWidth,window.innerHeight)}dispose(){this.running=!1,window.removeEventListener("resize",this.onResize),window.removeEventListener("keydown",this.onKeyDown),this.ui.dispose(),this.grabSystem?.dispose(),this.waveManager?.dispose(),this.defence?.dispose(),this.effectPool?.dispose(),this.world?.dispose(),this.audio.dispose(),this.renderer.dispose()}}const J_=document.getElementById("game-shell"),vh=new $_(J_);vh.start().catch(r=>{console.error("Hellgate Manor startup failed:",r);const t=document.getElementById("loading");t&&(t.innerHTML=`
      <div class="loading-panel">
        <div class="loading-title">HELLGATE MANOR</div>
        <div id="loading-status">FAILED TO OPEN THE GATE</div>
        ${r?.assetFilename?`<div style="margin-top:14px;font:900 15px/1.4 Segoe UI,Arial,sans-serif;color:#ff9a5d;letter-spacing:.04em">ASSET: ${String(r.assetFilename).replace(/[<>&]/g,"")}</div>`:""}
        <div style="margin-top:10px;font:700 11px/1.4 Segoe UI,Arial,sans-serif;color:#b9aaa2;max-width:520px">
          ${String(r?.message??"Unknown startup error").replace(/[<>&]/g,"")}
        </div>
      </div>`)});window.addEventListener("beforeunload",()=>vh.dispose());
