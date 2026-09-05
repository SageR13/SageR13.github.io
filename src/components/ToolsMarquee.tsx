import { DESIGN_TOOLS } from '../data/tools';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { DesignToolIcon } from './ToolIcons';
import styles from './ToolsMarquee.module.css';

export function ToolsMarquee() {
  const reducedMotion = useReducedMotion();
  const loop = [...DESIGN_TOOLS, ...DESIGN_TOOLS];

  return (
    <div className={styles.root}>
      <p className={styles.srOnly}>Design tools: {DESIGN_TOOLS.map((tool) => tool.name).join(', ')}</p>
      <div className={styles.viewport} aria-hidden="true">
        <div className={`${styles.track} ${reducedMotion ? styles.trackStatic : ''}`}>
          {loop.map((tool, index) => (
            <span key={`${tool.id}-${index}`} className={styles.item}>
              <span className={styles.iconWrap}>
                <DesignToolIcon id={tool.id} className={styles.icon} />
              </span>
              <span className={styles.label}>{tool.name}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
