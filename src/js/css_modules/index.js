import React from 'react'
import styles from './index.less'

console.log(styles)

const Page = () => {
  return (
    <div className={styles.div}>
      css modules
      <div className='aaaa'>aaaa</div>
    </div>
  )
}

export default Page
