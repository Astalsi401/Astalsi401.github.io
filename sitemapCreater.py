import os
import re

os.chdir(os.path.dirname(os.path.abspath(__file__)))
folders = ['notes', 'R', 'stata', 'portfolio']


def getFiles(path):
    '''
    Given a path, returns a list of URLs of all the HTML files found in the directory 
    and its subdirectories.

    Args:
        path (str): The path to the directory to search for HTML files.

    Returns:
        list: A list of URLs of all HTML files found in the given directory and its subdirectories.
    '''
    return ['https://astalsi401.github.io/' + re.sub(r'\\', '/', os.path.join(root, f)) for root, dirs, files in os.walk(path) for f in files if re.findall(r'\.html$', f)]


def url(file):
    """
    Returns an XML url tag with the given file path as the loc element.

    Args:
        file (str): The file path to be used as the loc element.

    Returns:
        str: The XML url tag with the loc element containing the given file path.
    """
    return f'''    
    <url>
        <loc>{file}</loc>
    </url>'''


def sitemap():
    """
    Generate a sitemap.xml file for a website with the given list of folders and their files.
    """
    pathes = {folder: getFiles(folder) for folder in folders}
    res = f'''<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://astalsi401.github.io/index.html</loc>
    </url>{''.join([url(path) for folder in folders for path in pathes[folder]])}
</urlset>'''
    open('sitemap.xml', mode='w').write(res)


sitemap()
