import Container from "@/components/Container"
import PageSpacing from "@/components/PageSpacing"
import Header from "@/components/Header"
import H1 from "@/components/headings/H1"
import H2 from "@/components/headings/H2"
import H3 from "@/components/headings/H3"
import H4 from "@/components/headings/H4"
import H5 from "@/components/headings/H5"
import BtnPrimary from '@/components/buttons/BtnPrimary'
import BtnOrange from '@/components/buttons/BtnOrange'
import BtnLight from '@/components/buttons/BtnLight'
import InlineLink from "@/components/InlineLink"
import Input from "@/components/form/Input"
import Dropdown from "@/components/buttons/Dropdown"

import { useRouter } from "next/router"

export default function StylesSheet () {

    const router = useRouter()

    return (
        <>
            <Container>
                <PageSpacing>
                    <div>
                        <p>{`<Header h1Text='' pText='' btnType='' btnText='' btnOnClick='' />`}</p>
                        <Header 
                            pText='Please use this page to make sure styles are consistent throughout the app.'
                            h1Text='Welcome to the Certify StyleSheet' 
                            btnType='primary'
                            btnText='Lost? Go Home'
                            btnOnClick={() => router.push('/')}
                            />
                    </div>
                    <hr />
                    <div className="flex flex-col gap-5">
                        <H2 className=''>Typography</H2>
                        <div className="grid gap-5">
                            <H1 className=''>Heading 1</H1>
                            <H2 className=''>Heading 2</H2>
                            <H3 className=''>Heading 3</H3>
                            <H4 className=''>Heading 4</H4>
                            <H5 className=''>Heading 5</H5>
                            <p>This is an <InlineLink text='inline link' href='/' /> component</p>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <H2>Button Components</H2>
                        <div className="grid grid-cols-4 gap-10">
                            <BtnPrimary 
                                btnText='BtnPrimary'
                                width='w-100'
                            />
                            <BtnOrange 
                                btnText='BtnOrange'
                                width='w-100'
                            />
                            <BtnLight
                                btnText='BtnLight'
                                width='w-100'
                            />
                            <Dropdown 
                                title='Dropdown Menu'
                                dropdownItems={dropdownItems}
                            />
                        </div>
                    </div>
                    <hr />
                    <div>
                        <H2>Form Components</H2>
                        <Input 
                            placeholder={'<Input type="" placeholder="" onChange={} name={} value={} require={} className={``} />'}
                        />
                    </div>
                </PageSpacing>
            </Container>
        </>
    )
}

const dropdownItems = [
    {
        name: 'Home',
        link: '/'
    },
    {
        name: 'About',
        link: '/about'
    },
    {
        name: 'Contact',
        link: '/contact'
    }, 
    {
        name: 'Pricing',
        link: '/pricing'
    }
]