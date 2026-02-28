export default function Logo() {
    return (
        <svg height="40" viewBox="0 0 60 40" width="60" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor:'#4f46e5', stopOpacity:1}} />
                    <stop offset="50%" style={{stopColor:'#7c3aed', stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:'#0891b2', stopOpacity:1}} />
                </linearGradient>
            </defs>
            <path 
                fill="url(#cloudGradient)" 
                fillRule="evenodd" 
                d="M261.118,859.966V860H221.8v-0.023a11.976,11.976,0,1,1,.461-23.947,12.613,12.613,0,0,1,1.463.094,14.169,14.169,0,0,1-.076-1.449,15.239,15.239,0,0,1,30.351-1.3,9.828,9.828,0,0,1,1-.053,9.437,9.437,0,0,1,9.517,8.94,9.3,9.3,0,0,1,5.48,8.423A9.409,9.409,0,0,1,261.118,859.966Z" 
                id="cloud" 
                transform="translate(-210 -820)"
            />
        </svg>
    )
}