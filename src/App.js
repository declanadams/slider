import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';
function App() {

  const [people, setPeople] = useState(data);
  const [idx , setIdx] = useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if(idx < 0){
        setIdx(lastIndex)
    }

    if(idx > lastIndex){
        setIdx(0)
    }
  },[idx, people]);


  useEffect(() => {
      let slider = setInterval(() => {
          setIdx(idx + 1)
      }, 3000)
      return () => clearInterval(slider);
  }, [idx]);


  return (
    <>
        <section className='section'>
            <div className='title'>
                <h2><span>/</span>Reviews</h2>
            </div>

            <div className='section-center'>
                {
                    people.map((person, personIdx) => {
                        const{id, image, name, title, quote} = person;
                        let position ='nextSlide';

                        if(personIdx === idx){
                            position = 'activeSlide'
                        }
                        if(personIdx === idx - 1 || (idx === 0 && personIdx === people.length -1)){
                            position='lastSlide'
                        }
                        return(
                            <article className={position} key={id}>
                                <img src={image} alt={name} className='person-img'/>
                                <h4>{name}</h4>
                                <p className='title'>{title}</p>
                                <p className='text'>{quote}</p>
                                <FaQuoteRight className='icon'/>
                            </article>
                        )
                    })
                }

                <button className='prev' onClick={() => setIdx(idx - 1)}><FiChevronLeft/></button>
                <button className='next' onClick={() => setIdx(idx + 1)}><FiChevronRight/></button>
            </div>
        </section>
    </>
  );
}

export default App;
