//This layout file is used to wrap all the pages in the dashboard folder.
import SideNav from '@/app/ui/dashboard/sidenav';
 
//Loading the children and sign it has the type ReactNode
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    /*
        Flex is used for a flexible layout,
        h-screen is used to make the layout take the full height of the screen,
        flex-col is used to stack the elements vertically on smaller screens,
        md:flex-row is used to stack the elements horizontally on medium and larger screens,
        md:overflow-hidden is used to hide the overflow on medium and larger screens to prevent scrolling issues with the side nav,
        Keep in mind that sm is not explicitly used here because the default flex-col will apply to all screen sizes until it is overridden by md:flex-row at the medium breakpoint.
    */ 
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}