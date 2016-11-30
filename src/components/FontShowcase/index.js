import React, {PropTypes} from 'react'

import data from '../../data.yml'
import s from './FontShowcase.sass'
import FontPreview from '../FontPreview'
import {getFontItem} from '../../utils'

export default class FontShowcase extends React.Component {
  static propTypes = {
    groupIndex: PropTypes.number.isRequired,
    itemIndex: PropTypes.number.isRequired,
    onTitleClicked: PropTypes.func.isRequired,
    mobile: PropTypes.bool.isRequired
  }
  render() {
    const {groupIndex, itemIndex, onTitleClicked, mobile} = this.props
    const {
      name: fontName,
      desc: fontDescription,
      family: fontFamily,
      weightSet
    } = getFontItem(data, groupIndex, itemIndex)
    const waterfallItems = mobile ? data.waterfall.items.mobile : data.waterfall.items.desktop

    return <div>
      <div className={s.topNav}>
        <div className={s.title} onClick={onTitleClicked}>한글 웹폰트 글꼴보기집</div>
        <div className={s.menuButton}>글꼴 목록</div>
      </div>
      <div className={s.content}>
        <div className={s.fontName} style={{fontFamily}}>{fontName}</div>
        <div className={s.fontDescription} style={{fontFamily}}>{fontDescription}</div>
      </div>
      <div className={s.externalLinks}>
        <div className={s.linkButton}>다운로드 링크</div>
        <div className={s.linkButton}>라이선스 정보</div>
      </div>
      <div className={s.previewSection}>
        <div className={s.areaTitle} style={{marginTop: '20px'}}>글꼴 미리보기</div>
        {waterfallItems.map(item => {
          const {
            size: fontSize,
            text: exampleText,
            lineHeight,
            letterSpacing
          } = item
          const props = {
            fontFamily,
            fontSize,
            exampleText,
            lineHeight,
            letterSpacing,
            weightSet
          }
          return <FontPreview key={fontSize} {...props} />
        })}
      </div>
      <div className={s.rendering}>
        <div className={s.areaTitle} style={{marginTop: '24px'}}>렌더링 예시</div>
      </div>
    </div>
  }
}
