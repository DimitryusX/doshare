import { useEffect, useRef } from 'react';
import hljs from 'highlight.js/lib/core';

import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import csharp from 'highlight.js/lib/languages/csharp';
import cpp from 'highlight.js/lib/languages/cpp';
import c from 'highlight.js/lib/languages/c';
import php from 'highlight.js/lib/languages/php';
import ruby from 'highlight.js/lib/languages/ruby';
import go from 'highlight.js/lib/languages/go';
import rust from 'highlight.js/lib/languages/rust';
import kotlin from 'highlight.js/lib/languages/kotlin';
import swift from 'highlight.js/lib/languages/swift';
import dart from 'highlight.js/lib/languages/dart';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import bash from 'highlight.js/lib/languages/bash';
import sql from 'highlight.js/lib/languages/sql';
import yaml from 'highlight.js/lib/languages/yaml';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import markdown from 'highlight.js/lib/languages/markdown';

import 'highlight.js/styles/atom-one-light.css';
import 'highlight.js/styles/atom-one-dark.css';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('py', python);
hljs.registerLanguage('java', java);
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('cs', csharp);
hljs.registerLanguage('c#', csharp);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('c++', cpp);
hljs.registerLanguage('c', c);
hljs.registerLanguage('php', php);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('rb', ruby);
hljs.registerLanguage('go', go);
hljs.registerLanguage('golang', go);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('rs', rust);
hljs.registerLanguage('kotlin', kotlin);
hljs.registerLanguage('kt', kotlin);
hljs.registerLanguage('swift', swift);
hljs.registerLanguage('dart', dart);
hljs.registerLanguage('json', json);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('sass', scss);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('shell', bash);
hljs.registerLanguage('sh', bash);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('yml', yaml);
hljs.registerLanguage('dockerfile', dockerfile);
hljs.registerLanguage('docker', dockerfile);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('md', markdown);

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {

  const codeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (codeRef.current) {
      const detected = hljs.highlightAuto(code);
      if (detected.language) {
        hljs.highlightElement(codeRef.current);
      }
    }
  }, [code]);

  return (
    <pre className="rounded-xl">
      <code 
        ref={codeRef} 
        className="whitespace-pre-wrap hljs rounded-xl block p-4 bg-white dark:bg-slate-800"
      >
        {code}
      </code>
    </pre>
  );
};

export default CodeBlock;