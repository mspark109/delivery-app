
const Page = ({header, footer, children}) =>  (
    <div className="Page">
      <header>{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
      {/* <MyLayout.DialogContainer /> */}
    </div>
)


export default Page;