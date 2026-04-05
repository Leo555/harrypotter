#!/usr/bin/env python3
"""
从哈利·波特.epub 中提取全7册中文版内容，切分为独立的 txt 文件。
输出文件命名格式与英文版一致：
  Book1-哈利·波特与魔法石.txt
  Book2-哈利·波特与密室.txt
  ...
  Book7-哈利·波特与死亡圣器.txt
"""

import os
import re
import ebooklib
from ebooklib import epub
from bs4 import BeautifulSoup

# 7册书的信息
BOOKS = [
    (1, '哈利·波特与魔法石', 17),
    (2, '哈利·波特与密室', 18),
    (3, '哈利·波特与阿兹卡班的囚徒', 22),
    (4, '哈利·波特与火焰杯', 37),
    (5, '哈利·波特与凤凰社', 38),
    (6, '哈利·波特与混血王子', 30),
    (7, '哈利·波特与死亡圣器', 36),  # 36章 + 尾声
]

BOOK_TITLES = [b[1] for b in BOOKS]


def extract_all_lines(epub_path):
    """从 epub 提取所有文本行"""
    book = epub.read_epub(epub_path)
    all_lines = []

    for item_id, linear in book.spine:
        item = book.get_item_with_id(item_id)
        if item:
            content = item.get_content().decode('utf-8')
            soup = BeautifulSoup(content, 'xml')
            text = soup.get_text(separator='\n')
            lines = [l.strip() for l in text.split('\n')]
            lines = [l for l in lines if l]
            all_lines.extend(lines)

    return all_lines


def clean_line(line):
    """清理行内容，去除广告/水印文字"""
    # 去除常见的epub水印文字
    patterns = [
        r'\[更多好书关注微信\w+\]',
        r'更多好书关注微信\w+',
        r'\[.*?书友群.*?\]',
    ]
    for pat in patterns:
        line = re.sub(pat, '', line)
    return line.strip()


def is_chapter_title(line):
    """判断是否是章节标题"""
    return bool(re.match(r'^第[一二三四五六七八九十百零\d]+章', line))


def is_epilogue(line):
    """判断是否是尾声"""
    return '尾声' in line and '十九年后' in line


def is_book_title(line):
    """判断是否是书名"""
    return line in BOOK_TITLES


def is_toc_or_meta(line):
    """判断是否是目录或元数据行"""
    if line == '主目录':
        return True
    if line == '返回主目录':
        return True
    if is_book_title(line):
        return True
    return False


def find_content_sections(all_lines):
    """
    找到所有内容章节的起始位置。
    区分目录中的章节标题（短行连续出现）和正文中的章节标题（后面跟着长段落）。
    """
    content_chapters = []

    i = 0
    while i < len(all_lines):
        line = all_lines[i]

        # 检查是否是章节标题或尾声
        if is_chapter_title(line) or is_epilogue(line):
            # 看看后面的内容，判断是目录条目还是正文章节
            # 目录条目：后面紧接着又是章节标题、书名、或者"返回主目录"
            # 正文章节：后面有长的段落文字

            is_content = False
            # 向后看几行
            for j in range(i + 1, min(i + 5, len(all_lines))):
                next_line = all_lines[j]
                if is_chapter_title(next_line) or is_book_title(next_line) or is_toc_or_meta(next_line) or is_epilogue(next_line):
                    # 下一行也是标题/目录，说明这是目录区域
                    break
                elif len(next_line) > 30:
                    # 下一行是长段落，说明这是正文章节
                    is_content = True
                    break
            else:
                # 如果循环正常结束（没有break），检查是否有实质内容
                for j in range(i + 1, min(i + 3, len(all_lines))):
                    if len(all_lines[j]) > 30:
                        is_content = True
                        break

            if is_content:
                content_chapters.append((i, line))

        i += 1

    return content_chapters


def split_into_books(all_lines, content_chapters):
    """
    将章节分配到对应的书中。
    通过跟踪章节编号的重置来判断新一本书的开始。
    """
    books_content = []

    # 第一步：识别每本书的章节范围
    # 规律：每本书的章节从"第一章"开始编号
    # 当遇到"第一章"且之前已经有更高编号的章节时，表示新一本书开始

    book_boundaries = []  # (chapter_index_in_content_chapters, book_number)
    current_book = 0
    last_chapter_num = 0

    def chapter_to_num(title):
        """从章节标题提取章节号"""
        m = re.match(r'^第([一二三四五六七八九十百零\d]+)章', title)
        if not m:
            return 999  # 尾声
        num_str = m.group(1)
        # 中文数字转阿拉伯数字
        cn_map = {'一': 1, '二': 2, '三': 3, '四': 4, '五': 5,
                  '六': 6, '七': 7, '八': 8, '九': 9, '十': 10,
                  '零': 0, '百': 100}
        if num_str.isdigit():
            return int(num_str)
        # 简单的中文数字解析
        result = 0
        if len(num_str) == 1:
            return cn_map.get(num_str, 0)
        elif num_str == '十':
            return 10
        elif num_str.startswith('十'):
            return 10 + cn_map.get(num_str[1], 0)
        elif len(num_str) == 2 and num_str[1] == '十':
            return cn_map.get(num_str[0], 0) * 10
        elif len(num_str) == 3 and num_str[1] == '十':
            return cn_map.get(num_str[0], 0) * 10 + cn_map.get(num_str[2], 0)
        return 0

    for idx, (line_num, title) in enumerate(content_chapters):
        ch_num = chapter_to_num(title)

        if ch_num == 1 and (last_chapter_num > 1 or idx == 0):
            # 新一本书开始
            current_book += 1
            book_boundaries.append((idx, current_book))

        if ch_num != 999:
            last_chapter_num = ch_num

    # 尾声属于第7册
    print(f"Detected {len(book_boundaries)} books")
    for start_idx, book_num in book_boundaries:
        print(f"  Book {book_num}: starts at chapter index {start_idx} - {content_chapters[start_idx][1]}")

    # 第二步：提取每本书的内容
    for b_idx, (start_ch_idx, book_num) in enumerate(book_boundaries):
        # 确定该书的章节范围
        if b_idx + 1 < len(book_boundaries):
            end_ch_idx = book_boundaries[b_idx + 1][0]
        else:
            end_ch_idx = len(content_chapters)

        book_chapters = content_chapters[start_ch_idx:end_ch_idx]

        # 提取每个章节的文本
        book_text_parts = []
        book_info = BOOKS[book_num - 1]
        book_text_parts.append(book_info[1])  # 书名作为第一行
        book_text_parts.append('')

        for ch_idx_in_book, (ch_line_num, ch_title) in enumerate(book_chapters):
            # 确定章节结束位置
            if ch_idx_in_book + 1 < len(book_chapters):
                next_ch_line_num = book_chapters[ch_idx_in_book + 1][0]
            else:
                # 最后一章，找到下一本书的开始或文件结尾
                if b_idx + 1 < len(book_boundaries):
                    # 找到下一本书第一章之前的所有目录行
                    next_book_first_ch = content_chapters[book_boundaries[b_idx + 1][0]][0]
                    next_ch_line_num = next_book_first_ch
                else:
                    next_ch_line_num = len(all_lines)

            # 提取章节内容
            chapter_lines = []
            for li in range(ch_line_num, next_ch_line_num):
                line = all_lines[li]
                # 跳过目录和元数据行
                if is_toc_or_meta(line) and li != ch_line_num:
                    continue
                if line == '返回主目录':
                    continue
                # 如果是下一本书的目录区，跳过
                if is_chapter_title(line) and li != ch_line_num:
                    # 如果后面紧接着也是章节标题，说明进入了目录区
                    if li + 1 < next_ch_line_num and (is_chapter_title(all_lines[li + 1]) or is_book_title(all_lines[li + 1])):
                        break
                # 清理行内容
                cleaned = clean_line(line)
                if cleaned:
                    chapter_lines.append(cleaned)

            # 添加章节内容
            if chapter_lines:
                book_text_parts.append(chapter_lines[0])  # 章节标题
                for cl in chapter_lines[1:]:
                    book_text_parts.append(cl)
                book_text_parts.append('')  # 章节间空行

        books_content.append((book_num, book_info[1], '\n'.join(book_text_parts)))

    return books_content


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    epub_path = os.path.join(script_dir, '哈利·波特.epub')

    if not os.path.exists(epub_path):
        print(f"错误: 找不到 epub 文件: {epub_path}")
        return

    print("正在读取 epub 文件...")
    all_lines = extract_all_lines(epub_path)
    print(f"共提取 {len(all_lines)} 行文本")

    print("\n正在识别章节...")
    content_chapters = find_content_sections(all_lines)
    print(f"共找到 {len(content_chapters)} 个内容章节")

    print("\n正在切分为7册...")
    books = split_into_books(all_lines, content_chapters)

    print(f"\n正在保存文件...")
    for book_num, title, text in books:
        filename = f"Book{book_num}-{title}.txt"
        filepath = os.path.join(script_dir, filename)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(text)
        # 统计章节数
        chapter_count = len(re.findall(r'^第[一二三四五六七八九十百零\d]+章', text, re.MULTILINE))
        epilogue_count = 1 if '尾声' in text and '十九年后' in text else 0
        total = chapter_count + epilogue_count
        char_count = len(text)
        print(f"  {filename}: {total} 章, {char_count:,} 字符")

    print("\n完成！")


if __name__ == '__main__':
    main()
